<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SlideResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Slide;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
  public function index()
  {
    $banners = Slide::all();
    $featuredProducts = Product::where("featured", 1)->get();
    return Inertia::render("Store/Home")
      ->with("banners", SlideResource::collection($banners))
      ->with("featuredProducts", ProductResource::collection($featuredProducts));
  }

  public function showCategory($categorySlug)
  {
    $category = Category::whereSlug($categorySlug)->first();

    if (!$category) {
      return redirect()->route("404");
    }

    $products = $category->products;

    return Inertia::render("Store/Category")
      ->with("category", $category)
      ->with("products", ProductResource::collection($products));
  }

  public function showSubcategory($categorySlug, $subcategorySlug)
  {
    $subcategory = Subcategory::whereSlug($subcategorySlug)
      ->whereHas("category", function ($q) use ($categorySlug) {
        return $q->where("slug", $categorySlug);
      })
      ->first();

    if (!$subcategory) {
      return redirect()->route("404");
    }

    dd($subcategory);

    return Inertia::render("Store/Subcategory")->with("subcategory", $subcategory);
  }

  public function showProduct($categorySlug, $subcategorySlug, $productSlug)
  {
    $product = Product::whereSlug($productSlug)
      ->whereHas("category", function ($q) use ($categorySlug) {
        return $q->where("slug", $categorySlug);
      })
      ->whereHas("subcategory", function ($scQ) use ($subcategorySlug) {
        return $scQ->where("slug", $subcategorySlug);
      })
      ->first();

    return Inertia::render("Store/Product")->with("product", new ProductResource($product));
  }

  public function notFound()
  {
    return Inertia::render("Store/NotFound");
  }

  public function productSearch(Request $request)
  {
    $queryString = $request->input("q");

    $products = Product::where("name", "like", "%$queryString%")
      ->orWhere("sku", "like", "%$queryString%")
      ->orWhere("icono", "like", "%$queryString%")
      ->orWhereHas("category", function ($q) use ($queryString) {
        return $q->where("name", "like", "%$queryString%");
      })
      ->orWhereHas("subcategory", function ($q) use ($queryString) {
        return $q->where("name", "like", "%$queryString%");
      })
      ->get();

    return response()->json(ProductResource::collection($products));
  }
}
