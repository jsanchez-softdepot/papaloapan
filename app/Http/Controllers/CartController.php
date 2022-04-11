<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressResource;
use App\Models\Address;
use App\Models\Colonia;
use App\Models\Configuration;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Darryldecode\Cart\Facades\CartFacade as Cart;
use Darryldecode\Cart\CartCondition;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Throwable;

class CartController extends Controller
{
  public function index()
  {
    $sessId = Auth::check() ? Auth::user()->id : Session::getId();
    $cart = Cart::session($sessId)->getContent();

    $userAddresses = Address::where("user_id", Auth::id())->get();

    // Cart::session($sessId)->clear();
    // Cart::session($sessId)->clearCartConditions();
    // Cart::clear();

    return Inertia::render("Store/Cart/CartIndex")
      ->with("cart", $cart)
      ->with("userAddresses", AddressResource::collection($userAddresses));
    // return response()->json([
    //   "cart" => Cart::session($sessId)->getContent(),
    //   "total" => Cart::session($sessId)->getTotal(),
    // ]);
  }

  public function saveShipping(Request $request)
  {
    $sessId = Auth::check() ? Auth::user()->id : Session::getId();
    $shippingPrice = Configuration::where("name", "costo_envio")->first();

    if ($request->input("shippingMethod") === "PICKUP") {
      $shippingAttributes = [
        "shipping_method" => "PICKUP",
      ];

      $shippingCondition = new CartCondition([
        "name" => "Shipping",
        "type" => "shipping",
        "target" => "subtotal",
        "value" => "0",
        "attributes" => $shippingAttributes,
      ]);

      Cart::session($sessId)->condition($shippingCondition);

      return redirect()
        ->route("store.cart.paymentInfo")
        ->with("success", "Información de envío actualizada");
    }

    $request->validate([
      "calle" => ["required"],
      "num" => ["required"],
      "colonia" => ["required"],
    ]);

    $addressCol = Colonia::find($request->input("colonia"));

    $shippingAttributes = [
      "shipping_method" => "DELIVERY",
      "address_street" => $request->input("calle"),
      "address_num" => $request->input("num"),
      "address_num_int" => $request->input("numInt"),
      "address_colonia" => $request->input("colonia"),
      "address_city" => $addressCol->city->name,
      "address_state" => $addressCol->city->state->name,
      "address_country" => "México",
      "address_countrycode" => "MX",
      "address_zipcode" => $request->input("zipcode"),
      "address_instrucciones" => $request->input("instrucciones"),
    ];

    if (Auth::check()) {
      if ($request->has("selectedAddress") && intval($request->input("selectedAddress")) < 1) {
        $address = Address::create([
          "default" => \boolval($request->input("defaultAddress")),
          "alias" => $request->input("alias"),
          "calle" => $request->input("calle"),
          "num" => $request->input("num"),
          "num_int" => $request->input("numInt"),
          "instrucciones" => $request->input("instrucciones"),
          "colonia_id" => $request->input("colonia"),
          "type" => "SHIPPING",
          "user_id" => Auth::id(),
        ]);
      }

      $shippingAttributes["address_receiver"] = Auth::user()->fullname;
      $shippingAttributes["address_phone"] = Auth::user()->phone;
      $shippingAttributes["address_email"] = Auth::user()->email;
      $shippingAttributes["address_zipcode"] = $request->input("zipcode");
    } else {
      $shippingAttributes["address_receiver"] = $request->input("receiverName");
      $shippingAttributes["address_phone"] = $request->input("receiverPhone");
      $shippingAttributes["address_email"] = $request->input("receiverEmail");
      $shippingAttributes["address_zipcode"] = $request->input("zipcode");
    }

    $shippingAmountVal = $shippingPrice ? $shippingPrice->value : 50;

    if (Cart::session($sessId)->getSubtotal() < 250) {
      $shippingTotal = $shippingAmountVal;
    } else {
      $shippingTotal = 0;
    }

    $shippingCondition = new CartCondition([
      "name" => "Shipping",
      "type" => "shipping",
      "target" => "subtotal",
      "value" => "+" . $shippingTotal,
      "attributes" => $shippingAttributes,
    ]);

    Cart::session($sessId)->condition($shippingCondition);

    return redirect()
      ->route("store.cart.paymentInfo")
      ->with("success", "Información de envío actualizada");
  }

  public function paymentInfo()
  {
    $sessId = Auth::check() ? Auth::user()->id : Session::getId();
    $cartContent = Cart::session($sessId)->getContent();
    $cartShippingCondition = Cart::session($sessId)->getCondition("Shipping");

    $userAddresses = Address::where("user_id", Auth::id())->get();

    return Inertia::render("Store/Cart/CartPayment")
      ->with("cart", $cartContent)
      ->with("cartShipping", $cartShippingCondition->getAttributes())
      ->with("userAddresses", $userAddresses);
  }

  public function clear(Request $request)
  {
    $sessId = Auth::check() ? Auth::id() : Session::getId();

    $cartCont = Cart::session($sessId)->getContent();

    foreach ($cartCont as $item) {
      Cart::session($sessId)->remove($item->id);
    }

    return redirect()->back();

    // Cart::session($sessId)->clear();

    // return response("ok", 200);
    // return response()->json(Cart::session($sessId)->getContent());
  }

  public function add(Request $request)
  {
    $request->validate([
      "product" => "required",
      "qty" => "required",
    ]);

    $sessId = Auth::check() ? Auth::id() : Session::getId();

    try {
      $reqPid = $request->input("product.id");
      $product = Product::find($reqPid);
      $pThumb = $product->getFirstMediaUrl("featuredImage", "thumbnail");

      Cart::session($sessId)->add([
        "id" => $product->id,
        "name" => $product->name,
        "price" => $product->price,
        "quantity" => $request->input("qty"),
        "attributes" => [
          "thumbnail" => $pThumb,
          "temperature" => $request->input("temperature", "CONGELADO"),
        ],
        "associatedModel" => $product,
      ]);

      return redirect()->back();

      // return response()->json([
      //   "cart" => Cart::getContent(),
      //   "total" => Cart::getTotal(),
      // ]);
    } catch (Throwable $e) {
      return redirect()->back();
      // return response($e->getMessage(), 500);
    }
  }

  public function remove(Request $request)
  {
    $request->validate([
      "product" => "required",
    ]);

    $sessId = Auth::check() ? Auth::id() : Session::getId();

    try {
      Cart::session($sessId)->remove($request->input("product"));

      return redirect()->back();

      // return response()->json([
      //   "cart" => Cart::getContent(),
      //   "total" => Cart::getTotal(),
      // ]);
    } catch (Throwable $e) {
      Log::info($e);

      return redirect()->back(500);
    }
  }

  public function update(Request $request)
  {
    $request->validate([
      "product" => "required",
      "quantity" => "required",
    ]);

    $sessId = Auth::check() ? Auth::id() : Session::getId();

    try {
      Cart::session($sessId)->update($request->input("product"), [
        "quantity" => [
          "relative" => false,
          "value" => $request->input("quantity"),
        ],
      ]);

      return redirect()->back();

      // return response()->json([
      //   "cart" => Cart::getContent(),
      //   "total" => Cart::getTotal(),
      // ]);
    } catch (Throwable $e) {
      Log::info($e);

      return redirect()->back(500);

      // return response($e->getMessage(), 500);
    }
  }
}
