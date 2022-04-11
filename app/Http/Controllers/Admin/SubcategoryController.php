<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SeoProperty;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $subcats = Subcategory::all();
    $cats = Category::all();

    $subcats->load(["category"]);

    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.subcategories.index"), "name" => "SubGrupos"]];
    return Inertia::render("Admin/Categories/SubcategoryIndex")
      ->with("categories", $cats)
      ->with("subcategories", $subcats)
      ->with("breadcrumbs", $breadcrumbs);
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
      ["url" => route("admin.subcategories.index"), "name" => "SubGrupos"],
      ["url" => route("admin.subcategories.create"), "name" => "Crear"],
    ];

    $cats = Category::all();

    return Inertia::render("Admin/Categories/SubcategoryCreate")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("categories", $cats);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    // if (!Auth::user()->can("create category")) {
    //   return response("error", 403);
    // }

    $request->validate([
      "name" => ["required"],
      "category_id" => ["required"],
    ]);

    $subcat = Subcategory::create([
      "name" => $request->input("name"),
      "created_by" => Auth::user()->id,
      "excerpt" => $request->input("excerpt"),
      "description" => $request->input("description"),
      "category_id" => $request->input("category_id"),
    ]);

    if ($request->has("seoTitle")) {
      $titleProp = SeoProperty::create(["name" => "title", "content" => $request->input("seoTitle"), "seoable_type" => "App\Models\Subcategory", "seoable_id" => $subcat->id]);
    }

    if ($request->has("seoDescription")) {
      $descProp = SeoProperty::create([
        "name" => "description",
        "content" => $request->input("seoDescription"),
        "seoable_type" => "App\Models\Subcategory",
        "seoable_id" => $subcat->id,
      ]);
    }

    if ($request->has("seoKeywords")) {
      $keywordsProp = SeoProperty::create([
        "name" => "keywords",
        "content" => $request->input("seoKeywords"),
        "seoable_type" => "App\Models\Subcategory",
        "seoable_id" => $subcat->id,
      ]);
    }

    return redirect()->route("admin.subcategories.index");
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Subcategory  $subcategory
   * @return \Illuminate\Http\Response
   */
  public function show(Subcategory $subcategory)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Subcategory  $subcategory
   * @return \Illuminate\Http\Response
   */
  public function edit(Subcategory $subcategory)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Subcategory  $subcategory
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Subcategory $subcategory)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Subcategory  $subcategory
   * @return \Illuminate\Http\Response
   */
  public function destroy(Subcategory $subcategory)
  {
    $subcategory->delete();
    return redirect()
      ->back()
      ->with("success", "Subgrupo eliminado correctamente");
  }
}
