<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Notifications\OrderDelivered;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function __construct()
  {
    $this->middleware(["role:superadmin", "permission:create order|read order|edit order|update order|delete order"]);
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $orders = Order::orderBy("created_at", "DESC")->paginate(100);

    return Inertia::render("Admin/Orders/OrderIndex")->with("orders", OrderResource::collection($orders));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function show(Order $order)
  {
    return Inertia::render("Admin/Orders/OrderDetail")->with("order", new OrderResource($order));
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function edit(Order $order)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Order $order)
  {
    if ($request->input("nextStatus")) {
      $newStatus = $order->status + 1;
      $order->status = $newStatus;

      if ($newStatus === 1) {
        $order->confirmed_at = now();
      }

      if ($newStatus === 3) {
        $oUser = $order->user;
        if ($oUser !== null) {
          $oUser->notify(new OrderDelivered($order));
        }
      }

      if ($newStatus === 4) {
        $order->completed_at = now();
      }
    }

    if ($request->input("cancelOrder")) {
      $order->status = 99;
    }

    $order->save();

    return redirect()->back();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function destroy(Order $order)
  {
    //
  }
}
