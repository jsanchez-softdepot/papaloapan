<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Colonia;
use App\Models\Configuration;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\User;
use App\Notifications\Admin\OrderReceived;
use App\Notifications\OrderCreated;
use App\Notifications\PaymentCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Throwable;

class OrderController extends Controller
{
  public function store(Request $request)
  {
    $sessId = Auth::check() ? Auth::id() : Session::getId();
    $cartShippingCondition = Cart::session($sessId)->getCondition("Shipping");
    $cartShippingAttributes = $cartShippingCondition->getAttributes();

    if ($cartShippingAttributes["shipping_method"] === "DELIVERY") {
      $request->validate([
        "billingStreet" => ["required"],
        "billingNum" => ["required"],
        "billingZipcode" => ["required"],
      ]);

      $addressCol = Colonia::find($cartShippingAttributes["address_colonia"]);

      $allowSameDayDeliver = false;
    } else {
      $allowSameDayDeliver = false;

      $addressCol = null;
    }

    try {
      DB::beginTransaction();

      $paymentMethod = PaymentMethod::where("code", $request->input("paymentMethod"))->first();

      $orderSubtotal = Cart::session($sessId)->getSubtotal();
      $orderTotal = Cart::session($sessId)->getTotal();

      $order = new Order();
      $order->user_id = Auth::check() ? Auth::id() : null;
      $order->shipping_method = $cartShippingAttributes["shipping_method"];
      $order->payment_method_id = $paymentMethod->id;
      $order->allow_same_day_deliver = $allowSameDayDeliver;
      $order->guestmode = !Auth::check();
      $order->status = 0;
      $order->total = $orderTotal;

      if ($cartShippingAttributes["shipping_method"] === "DELIVERY") {
        if ($orderSubtotal < 250) {
          $configShippingAmount = Configuration::where("name", "costo_envio")->first();
          $shippingAmountVal = $configShippingAmount ? $configShippingAmount->value : 50;
          $order->shipping_amount = $shippingAmountVal;
        } else {
          $order->shipping_amount = 0;
        }
      }

      $order->address_street = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_street"] : "";
      $order->address_num = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_num"] : "";
      $order->address_num_int = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_num_int"] : "";
      $order->address_colonia = $addressCol ? $addressCol->name : "";
      $order->address_city = $addressCol ? $addressCol->city->name : "";
      $order->address_state = $addressCol ? $addressCol->city->state->name : "";
      $order->address_country = "México";
      $order->address_countrycode = "MX";
      $order->address_receiver = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_receiver"] : "";
      $order->address_phone = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_phone"] : "";
      $order->address_email = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_email"] : "";
      $order->address_zipcode = $addressCol ? $addressCol->zipcode->code : "";

      $order->save();

      $cartContent = Cart::session($sessId)->getContent();

      foreach ($cartContent as $cartItem) {
        $oItemSubtotal = $cartItem->price * $cartItem->quantity;

        $oItem = new OrderItem();
        $oItem->name = $cartItem->name;
        $oItem->price = $cartItem->price;
        $oItem->quantity = $cartItem->quantity;
        $oItem->subtotal = $oItemSubtotal;
        $oItem->sku = $cartItem->associatedModel->sku;
        $oItem->cont_neto = $cartItem->associatedModel->cont_neto;
        $oItem->unit_abbr = $cartItem->associatedModel->unit->abbr;
        $oItem->temperatura = $cartItem->attributes["temperature"];
        $oItem->category_name = $cartItem->associatedModel->category->name;
        $oItem->subcategory_name = $cartItem->associatedModel->subcategory->name;
        $oItem->attributes = $cartItem->attributes;
        $oItem->order_id = $order->id;
        $oItem->product_id = $cartItem->associatedModel->id;
        $oItem->save();
      }

      if (Auth::check()) {
        $user = User::find($request->user()->id);
      } else {
        $user = new User();
        $user->name = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_receiver"] : "";
        $user->email = $cartShippingAttributes["shipping_method"] === "DELIVERY" ? $cartShippingAttributes["address_email"] : "";
      }

      $user->notify(new OrderCreated($order));

      $adminNotifiables = User::where(["send_notifications" => 1, "is_admin" => 1])->get();

      if ($adminNotifiables) {
        Notification::send($adminNotifiables, new OrderReceived($order));
      }

      $cartCont = Cart::session($sessId)->getContent();

      foreach ($cartCont as $item) {
        Cart::session($sessId)->remove($item->id);
      }

      Cart::session($sessId)->clear();
      Cart::session($sessId)->clearCartConditions();

      $payment = new Payment();
      $payment->order_id = $order->id;
      $payment->user_id = Auth::check() ? Auth::id() : null;
      $payment->payment_method_id = $paymentMethod->id;

      if ($paymentMethod->code === "PAYMENT_CREDIT_CARD") {
        $payment->address_street = $request->input("billingStreet");
        $payment->address_num = $request->input("billingNum");
        $payment->address_colonia = $request->input("billingCol");
        $payment->address_city = $request->input("billingCity");
        $payment->address_state = $request->input("billingState");
        $payment->address_zipcode = $request->input("billingZipcode");
        $payment->address_country = "México";
        $payment->address_countrycode = "MX";
      }

      $payment->status = 0;
      $payment->total = $order->total;
      $payment->save();

      //$user->notify(new PaymentCreated($payment));

      if ($paymentMethod->code === "PAYMENT_CREDIT_CARD") {
        $order->processConektaPayment($payment, $request->input("conektaToken"));
      }

      DB::commit();
      if (Auth::check()) {
        return redirect()->route("profile.account.index");
      } else {
        return redirect()->url("/");
      }
    } catch (Throwable $e) {
      DB::rollBack();
      Log::info($e->getMessage());
      Log::info($e);
      return redirect()
        ->back()
        ->with("error", "Ocurrió un error al ordenar su pedido. Intente nuévamente.");
    }
  }
}
