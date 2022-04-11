<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ZipCodeResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Imports\ZipCodesImport;
use App\Models\Colonia;
use App\Models\ZipCode;
use Maatwebsite\Excel\Facades\Excel;

class ZipCodeController extends Controller
{
  public function index()
  {
    // $zipcodes = ZipCodeResource::collection(ZipCode::all());
    //$zipcodes = ZipCode::all();
    $colonias = Colonia::all();
    $colonias->load(["zipcode"]);
    return Inertia::render("Admin/ZipCodes/ZipCodesImport")->with("colonias", $colonias);
  }

  public function postImport(Request $request)
  {
    $request->validate([
      "selectedFile" => ["required"],
    ]);

    Excel::import(new ZipCodesImport(), $request->file("selectedFile"));

    return redirect()
      ->back()
      ->with("Códigos postales importados");
  }

  public function searchValidate(Request $request)
  {
    $request->validate([
      "q" => "required",
    ]);

    $searchQ = $request->input("q");

    $zipcode = ZipCode::select(["id", "code"])
      ->where("code", $searchQ)
      ->first();

    if ($zipcode) {
      return response()->json(["zipcode" => new ZipCodeResource($zipcode)]);
    } else {
      return response("No encontrado", 404);
    }
  }
}
