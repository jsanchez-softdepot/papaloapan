<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SubcategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ZipCodeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get("/", function () {
//   return Inertia::render("Welcome", [
//     "canLogin" => Route::has("login"),
//     "canRegister" => Route::has("register"),
//     "laravelVersion" => Application::VERSION,
//     "phpVersion" => PHP_VERSION,
//   ]);
// });

// Route::get("/dashboard", function () {
//   return Inertia::render("Dashboard");
// })
//   ->middleware(["auth", "verified"])
//   ->name("dashboard");

Route::middleware(["auth"])
  ->prefix("admin")
  ->name("admin.")
  ->group(function () {
    Route::get("/", [DashboardController::class, "index"])->name("index");

    Route::get("products/import", [ProductController::class, "import"])->name("products.import");
    Route::post("products/import", [ProductController::class, "postImport"])->name("products.postImport");

    Route::post("payments", [PaymentController::class, "manualPayment"])->name("payments.manual");

    Route::resource("orders", AdminOrderController::class);
    Route::resource("users", UserController::class);
    Route::resource("roles", RoleController::class)->except(["show", "edit", "update"]);
    Route::resource("products", ProductController::class);
    Route::resource("categories", CategoryController::class);
    Route::resource("subcategories", SubcategoryController::class);

    Route::get("zipcodes", [ZipCodeController::class, "index"])->name("zipcodes.index");
    Route::post("zipcodes", [ZipCodeController::class, "postImport"])->name("zipcodes.import");

    Route::prefix("configuration")
      ->name("configuration.")
      ->group(function () {
        Route::get("privacy", [ConfigurationController::class, "privacyShow"])->name("privacy");
        Route::post("privacy", [ConfigurationController::class, "privacyUpdate"])->name("privacy.update");
        Route::get("costos", [ConfigurationController::class, "costos"])->name("costos");
        Route::post("costos", [ConfigurationController::class, "costosStore"])->name("costos.store");
        Route::get("social", [ConfigurationController::class, "social"])->name("social");
        Route::post("social", [ConfigurationController::class, "socialStore"])->name("social.store");
        Route::get("entrega", [ConfigurationController::class, "sameDayDeliver"])->name("delivery");
        Route::post("entrega", [ConfigurationController::class, "sameDayDeliverStore"])->name("delivery.store");
        Route::get("slider", [ConfigurationController::class, "slider"])->name("slider");
        Route::post("slider", [ConfigurationController::class, "addSlide"])->name("slider.store");
        Route::post("slider/remove/{id}", [ConfigurationController::class, "removeSlide"])->name("slider.remove");
      });
  });

require __DIR__ . "/auth.php";

Route::post("zipcodes/searchvalidate", [ZipCodeController::class, "searchValidate"])->name("zipcode.validate");

Route::name("profile.")
  ->middleware(["auth"])
  ->prefix("mi-cuenta")
  ->group(function () {
    Route::get("/", [ProfileController::class, "account"])->name("account.index");
    Route::get("addresses/{aid}", [ProfileController::class, "addressShow"])->name("address.show");
    Route::get("addresses", [ProfileController::class, "addresses"])->name("address.index");
    Route::post("addresses", [ProfileController::class, "addressesStore"])->name("address.store");
    Route::get("pedidos", [ProfileController::class, "orders"])->name("order.index");
    Route::get("pedidos/{orderId}", [ProfileController::class, "orderDetail"])->name("orders.detail");
  });

Route::name("store.")->group(function () {
  Route::get("/", [StoreController::class, "index"])->name('index');

  Route::get("products/search", [StoreController::class, "productSearch"]);

  Route::prefix("cart")
    ->name("cart.")
    ->group(function () {
      Route::get("/", [CartController::class, "index"])->name("index");
      Route::post("/saveShipping", [CartController::class, "saveShipping"])->name("saveShipping");
      Route::get("/payment", [CartController::class, "paymentInfo"])->name("paymentInfo");
      Route::post("/add", [CartController::class, "add"])->name("add");
      Route::post("/remove", [CartController::class, "remove"])->name("remove");
      Route::post("/update", [CartController::class, "update"])->name("update");
      Route::post("/clear", [CartController::class, "clear"]);
    });

  Route::post("order", [OrderController::class, "store"])->name("order.store");

  Route::get("/categoria/{categorySlug}", [StoreController::class, "showCategory"])->name("showCategory");
  Route::get("/{categorySlug}/{subcategorySlug}", [StoreController::class, "showSubcategory"])->name("showSubcategory");
  Route::get("/{categorySlug}/{subcategorySlug}/{productSlug}", [StoreController::class, "showProduct"])->name("showProduct");
});

Route::get("aviso-de-privacidad", function () {
  return Inertia::render("Store/Privacy");
});

Route::get("terminos-y-condiciones", function () {
  return Inertia::render("Store/Terms");
});

Route::get("404", [StoreController::class, "notFound"])->name("404");
