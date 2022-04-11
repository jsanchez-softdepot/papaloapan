<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressResource;
use App\Http\Resources\OrderResource;
use App\Models\Address;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfileController extends Controller
{
  public function addresses(Request $request)
  {
    $user = $request->user();

    $addresses = Address::where("user_id", $user->id)->get();

    return response()->json([
      "addresses" => AddressResource::collection($addresses),
    ]);
  }

  public function account(Request $request)
  {
    $user = $request->user();
    $addresses = Address::where("user_id", $user->id)->get();
    $orders = Order::where("user_id", $user->id)
      ->orderBy("created_at", "DESC")
      ->get();

    return Inertia::render("Account/MyAccount")
      ->with("orders", OrderResource::collection($orders))
      ->with("addresses", AddressResource::collection($addresses));

    // return response()->json(OrderResource::collection($orders));
  }

  public function addressShow(Request $request, $aid)
  {
    $address = Address::find($aid);

    Log::info($address);

    if ($address && $request->user()->id === \intval($address->user_id)) {
      return response()->json(new AddressResource($address));
    } else {
      return response("error", 500);
    }
  }

  public function addressesStore(Request $request)
  {
    $request->validate([
      "calle" => "required",
      "num" => "required",
      "zipcode" => "required",
      "colonia" => "required",
    ]);

    $address = new Address();

    if (Auth::check()) {
      $addrCnt = $request->user()->addresses->count();
      $address->alias = $request->filled("alias") ? $request->input("alias") : "Mi Dirección " . ($addrCnt + 1);
    } else {
      $addrCnt = 1;
    }

    $address->instrucciones = $request->input("instrucciones");
    $address->calle = $request->input("calle");
    $address->num = $request->input("num");
    $address->num_int = $request->input("num_int");
    $address->colonia_id = $request->input("colonia");
    $address->type = $request->input("type", "SHIPPING");
    $address->user_id = $request->user()->id;

    if ($request->input("default") && boolval($request->input("default"))) {
      Address::select(["id", "user_id", "default"])
        ->where("user_id", $request->user()->id)
        ->update(["default" => 0]);
      $address->default = boolval($request->input("default"));
    }

    $address->save();

    return redirect()
      ->back()
      ->with("success", "Dirección guardada correctamente");
  }

  public function orderDetail($orderId)
  {
    $order = Order::where("id", $orderId)->first();

    if ($order) {
      return Inertia::render("Account/OrderDetail")->with("order", new OrderResource($order));
    }
  }
}
