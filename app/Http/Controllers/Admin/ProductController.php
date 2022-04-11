<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\SeoProperty;
use App\Models\Subcategory;
use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.products.index"), "name" => "Productos"]];

    $products = Product::all();

    return Inertia::render("Admin/Products/ProductIndex")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("products", ProductResource::collection($products));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $breadcrumbs = [
      ["url" => route("admin.index"), "name" => "Dashboard"],
      ["url" => route("admin.products.index"), "name" => "Productos"],
      ["url" => route("admin.products.create"), "name" => "Crear Producto"],
    ];

    $categories = Category::all();
    $subcategories = Subcategory::all();

    return Inertia::render("Admin/Products/ProductCreate")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("categories", $categories)
      ->with("subcategories", $subcategories);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $productData = $request->validate([
      "name" => ["required"],
      "price" => ["required"],
      "netContent" => ["required"],
      "contentUnit" => ["required"],
      "sku" => ["required"],
      "description" => ["required"],
      "categoryId" => ["required"],
      "subcategoryId" => ["required"],
      "galleryFiles" => [""],
      "featuredProduct" => [""],
      "featuredImageFile" => ["required"],
      "temperature" => ["required"],
      //"productGalleryFiles" => ["required"],
      //"seoTitle" => ["required"],
      //"seoDescription" => ["required"],
      //"seoKeywords" => ["required"],
    ]);

    $product = new Product();

    try {
      DB::beginTransaction();

      $product = Product::create([
        "name" => $request->input("name"),
        "description" => $request->input("description"),
        "price" => $request->input("price"),
        "cont_neto" => $request->input("netContent"),
        "sku" => $request->input("sku"),
        "category_id" => $request->input("categoryId"),
        "subcategory_id" => $request->input("subcategoryId"),
        "created_by" => $request->user()->id,
        "featured" => intval($request->input("featuredProduct")),
        "unit_id" => \intval($request->input("unit")),
      ]);

      if ($request->has("seoTitle")) {
        $titleProp = SeoProperty::create(["name" => "title", "content" => $request->input("seoTitle"), "seoable_type" => "App\Models\Product", "seoable_id" => $product->id]);
      }

      if ($request->has("seoDescription")) {
        $descProp = SeoProperty::create([
          "name" => "description",
          "content" => $request->input("seoDescription"),
          "seoable_type" => "App\Models\Product",
          "seoable_id" => $product->id,
        ]);
      }

      if ($request->has("seoKeywords")) {
        $keywordsProp = SeoProperty::create([
          "name" => "keywords",
          "content" => $request->input("seoKeywords"),
          "seoable_type" => "App\Models\Product",
          "seoable_id" => $product->id,
        ]);
      }

      if ($request->hasFile("featuredImage")) {
        $product->addMediaFromRequest("featuredImage")->toMediaCollection("featuredImage");
      }

      if ($request->has("gallery")) {
        $product->addMultipleMediaFromRequest(["gallery"])->each(function ($fileAdder) {
          $fileAdder->toMediaCollection("gallery");
        });
      }

      DB::commit();

      return redirect()
        ->route("admin.products.index")
        ->with("success", "Producto agregado correctamente");
    } catch (ErrorException $e) {
      DB::rollBack();
      Log::info($e->getMessage());
      return redirect()
        ->back()
        ->with("error", $e->getMessage());
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Http\Response
   */
  public function show(Product $product)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Http\Response
   */
  public function edit(Product $product)
  {
    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.products.index"), "name" => "Productos"]];

    $categories = Category::all();
    $subcategories = Subcategory::all();

    $featured = $product->getFirstMediaUrl("featuredImage");

    $product->featured_image = $featured;

    return Inertia::render("Admin/Products/ProductEdit")
      ->with("product", new ProductResource($product))
      ->with("featuredImage", $featured)
      ->with("breadcrumbs", $breadcrumbs)
      ->with("categories", $categories)
      ->with("subcategories", $subcategories);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Product $product)
  {
    $request->validate([
      "name" => "required",
      "categoryId" => "required",
      "subcategoryId" => "required",
    ]);

    try {
      DB::beginTransaction();

      $product->update([
        "name" => $request->input("name"),
        "description" => $request->input("description"),
        "price" => $request->input("price"),
        "cont_neto" => $request->input("netContent"),
        "unit_id" => $request->input("contentUnit"),
        "sku" => $request->input("sku"),
        "category_id" => $request->input("categoryId"),
        "subcategory_id" => $request->input("subcategoryId"),
        "created_by" => $request->user()->id,
        "featured" => intval($request->input("featuredProduct")),
      ]);

      if ($request->has("seoTitle")) {
        $titleProp = SeoProperty::updateOrCreate(
          ["name" => "title", "seoable_type" => "App\Models\Product", "seoable_id" => $product->id],
          ["content" => $request->input("seoTitle")]
        );
      }

      if ($request->has("seoDescription")) {
        $descProp = SeoProperty::updateOrCreate(
          ["name" => "description", "seoable_type" => "App\Models\Product", "seoable_id" => $product->id],
          ["content" => $request->input("seoDescription")]
        );
      }

      if ($request->has("seoKeywords")) {
        $keywordsProp = SeoProperty::updateOrCreate(
          ["name" => "keywords", "seoable_type" => "App\Models\Product", "seoable_id" => $product->id],
          ["content" => $request->input("seoKeywords")]
        );
      }

      if ($request->hasFile("featuredImageFile")) {
        $product->addMediaFromRequest("featuredImageFile")->toMediaCollection("featuredImage");
      }

      if ($request->has("gallery")) {
        $product->addMultipleMediaFromRequest(["gallery"])->each(function ($fileAdder) {
          $fileAdder->toMediaCollection("gallery");
        });
      }

      DB::commit();

      return redirect()
        ->back()
        ->with("success", "Producto actualizado");
    } catch (ErrorException $e) {
      DB::rollBack();
      Log::info($e->getMessage());
      return redirect()
        ->back()
        ->with("error", $e->getMessage());
      return response($e->getMessage(), 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Http\Response
   */
  public function destroy(Product $product)
  {
    $product->delete();

    return redirect()
      ->back()
      ->with("success", "Producto eliminado correctamente");
  }

  public function import()
  {
    $breadcrumbs = [
      ["url" => route("admin.index"), "name" => "Dashboard"],
      ["url" => route("admin.products.index"), "name" => "Productos"],
      ["url" => route("admin.products.import"), "name" => "Importar"],
    ];

    $products = Product::all();

    return Inertia::render("Admin/Products/ImportProducts")->with("breadcrumbs", $breadcrumbs);
  }

  public function postImport(Request $request)
  {
    $request->validate(["products" => "required|array"]);
    $importSucceed = false;

    foreach ($request->input("products") as $inputProduct) {
      try {
        DB::beginTransaction();

        if ($inputProduct[0] !== null) {
          $inputCatName = Str::title($inputProduct[0]);
          $cat = Category::firstOrCreate(["name" => $inputCatName], ["created_by" => $request->user()->id]);
        } else {
          $cat = Category::first();
        }

        if ($inputProduct[1] !== null) {
          $inputSubcatName = Str::title($inputProduct[1]);
          $subcat = Subcategory::firstOrCreate(["name" => $inputSubcatName, "category_id" => $cat->id], ["created_by" => $request->user()->id]);
        } else {
          $subcat = Subcategory::first();
        }

        if ($request->input("replaceSku") && boolval($request->input("replaceSku")) === true) {
          $p = Product::firstOrNew(["sku" => $inputProduct[2]]);
        } else {
          $p = new Product();
        }

        $inputTemp = "NO APLICA";

        if ($inputProduct[11] === "Fresco / Congelado") {
          $inputTemp = "AMBOS";
        } elseif ($inputProduct[11] === "No aplica") {
          $inputTemp = "NO APLICA";
        } else {
          $inputTemp = $inputProduct[11];
        }

        $p->category_id = $cat->id;
        $p->subcategory_id = $subcat->id;
        $p->name = Str::title($inputProduct[3]);
        $p->sku = $inputProduct[2];
        $p->cont_neto = $inputProduct[4];
        $p->price = $inputProduct[8];
        $p->description = $inputProduct[7];
        $p->icono = $inputProduct[5];
        $p->ubicpieza = $inputProduct[6];
        $p->temperaturas = $inputTemp;
        $p->created_by = $request->user()->id;
        $p->save();

        DB::commit();
        $importSucceed = true;
      } catch (ErrorException $e) {
        $importSucceed = false;
        Log::info($e->getMessage());
        DB::rollBack();
      }
    }

    if ($importSucceed) {
      return redirect()
        ->route("admin.products.index")
        ->with("success", "Productos importados correctamente");
    } else {
      return redirect()
        ->route("admin.products.index")
        ->with("error", "Ocurrió un problema al importar");
    }
  }
}
