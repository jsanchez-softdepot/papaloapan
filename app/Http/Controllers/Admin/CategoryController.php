<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\SeoProperty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $cats = Category::all();
    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.categories.index"), "name" => "Grupos"]];
    return Inertia::render("Admin/Categories/CategoryIndex")
      ->with("categories", $cats)
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
      ["url" => route("admin.categories.index"), "name" => "Grupos"],
      ["url" => route("admin.categories.create"), "name" => "Crear"],
    ];

    return Inertia::render("Admin/Categories/CategoryCreate")->with("breadcrumbs", $breadcrumbs);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    /*
    if ( !Auth::user()->can('create category') ) {
            return response('error',403);
        }
        */

    $request->validate([
      "name" => "required",
    ]);

    $c = Category::create([
      "name" => $request->input("name"),
      "created_by" => Auth::user()->id,
      "excerpt" => $request->input("excerpt"),
      "description" => $request->input("description"),
    ]);

    if ($request->has("seoTitle")) {
      $titleProp = SeoProperty::create(["name" => "title", "content" => $request->input("seoTitle"), "seoable_type" => "App\Models\Category", "seoable_id" => $c->id]);
    }

    if ($request->has("seoDescription")) {
      $descProp = SeoProperty::create(["name" => "description", "content" => $request->input("seoDescription"), "seoable_type" => "App\Models\Category", "seoable_id" => $c->id]);
    }

    if ($request->has("seoKeywords")) {
      $keywordsProp = SeoProperty::create(["name" => "keywords", "content" => $request->input("seoKeywords"), "seoable_type" => "App\Models\Category", "seoable_id" => $c->id]);
    }

    if ($request->hasFile("featuredImage")) {
      $c->addMediaFromRequest("featuredImage")->toMediaCollection("featuredImage");
    }

    return redirect()->route("admin.categories.index");
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function show(Category $category)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function edit(Category $category)
  {
    $breadcrumbs = [
      ["url" => route("admin.index"), "name" => "Dashboard"],
      ["url" => route("admin.products.index"), "name" => "Gruops"],
      ["url" => route("admin.products.edit", $category->id), "name" => "Editar"],
    ];

    return Inertia::render("Admin/Categories/CategoryEdit")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("category", new CategoryResource($category));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Category $category)
  {
    $request->validate([
      "name" => "required",
    ]);

    $category->update([
      "name" => $request->input("name"),
      "created_by" => Auth::user()->id,
      "excerpt" => $request->input("excerpt"),
      "description" => $request->input("description"),
    ]);

    if ($request->has("seoTitle")) {
      $titleProp = SeoProperty::updateOrCreate(
        ["name" => "title", "seoable_type" => "App\Models\Category", "seoable_id" => $category->id],
        ["content" => $request->input("seoTitle")]
      );
    }

    if ($request->has("seoDescription")) {
      $descProp = SeoProperty::updateOrCreate(
        ["name" => "description", "seoable_type" => "App\Models\Category", "seoable_id" => $category->id],
        ["content" => $request->input("seoDescription")]
      );
    }

    if ($request->has("seoKeywords")) {
      $keywordsProp = SeoProperty::updateOrCreate(
        ["name" => "keywords", "seoable_type" => "App\Models\Category", "seoable_id" => $category->id],
        ["content" => $request->input("seoKeywords")]
      );
    }

    if ($request->hasFile("featuredImage")) {
      $category->addMediaFromRequest("featuredImage")->toMediaCollection("featuredImage");
    }

    return redirect()
      ->back()
      ->with("success", "Cambios guardados");
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function destroy(Category $category)
  {
    $category->delete();

    return redirect()->back();
  }
}
