<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Notifications\PaymentCompleted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class PaymentController extends Controller
{
  public function manualPayment(Request $request)
  {
    $request->validate([
      "order" => "required",
      "method" => "required",
    ]);

    try {
      $order = Order::find($request->input("order"));

      $payment = new Payment();
      $payment->order_id = $request->input("order");
      $payment->user_id = $request->user()->id;
      $payment->payment_method_id = $request->input("method");
      $payment->status = 1;
      $payment->total = $order->total;
      $payment->processor_api_status = "paid";
      $payment->processor_api_created_at = \time();
      $payment->processor_api_authcode = $request->input("authcode");
      $payment->processor_api_cardinfo = $request->input("info");
      $payment->save();

      if ($payment->order->guestmode) {
        $oUser = new User();
        $oUser->name = $payment->order->address_receiver;
        $oUser->email = $payment->order->address_email;
        $oUser->notify(new PaymentCompleted($payment));
      } else {
        $order->user->notify(new PaymentCompleted($payment));
      }

      // ProcessOrder::dispatch($order);
    } catch (Throwable $e) {
      Log::info($e);

      //return response($e->getMessage(), 500);

      return redirect()->back()->with('flash',['error' => $e->getMessage()]);
    }

    return redirect()->back();
  }
}
