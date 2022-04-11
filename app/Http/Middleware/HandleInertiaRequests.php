<?php

namespace App\Http\Middleware;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  //   protected $rootView = "app";

  /**
   * Determine the current asset version.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return string|null
   */
  public function version(Request $request)
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function share(Request $request)
  {
    $categories = Category::all();

    $sessId = Auth::check() ? Auth::id() : Session::getId();

    //Cart::session($sessId)->clear();
    //Cart::session($sessId)->clearCartConditions();

    $cart = Cart::session($sessId)->getContent();
    $cartSubtotal = Cart::session($sessId)->getSubtotal();
    $cartTotal = Cart::session($sessId)->getTotal();

    $configs = Configuration::select(["id", "name", "value"])
      ->get()
      ->keyBy("name");

    return array_merge(parent::share($request), [
      "auth" => [
        "user" => $request->user(),
      ],
      "categories" => CategoryResource::collection($categories),
      "configs" => $configs,
      "cart" => $cart,
      "cartSubtotal" => $cartSubtotal,
      "cartTotal" => $cartTotal,
      "flash" => function () use ($request) {
        return [
          "success" => $request->session()->get("success"),
          "info" => $request->session()->get("info"),
          "error" => $request->session()->get("error"),
        ];
      },
    ]);
  }

  public function rootView(Request $request)
  {
    if ($request->route()->getPrefix() === "/admin" || $request->route()->getPrefix() === "admin/configuration") {
      return "adm";
    } else {
      return "app";
    }
  }
}
