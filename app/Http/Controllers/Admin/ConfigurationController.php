<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConfigResource;
use App\Http\Resources\SlideResource;
use App\Models\Configuration;
use App\Models\Slide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ConfigurationController extends Controller
{
  public function __construct()
  {
    $this->middleware(["role:superadmin", "permission:create config|read config|edit config|update config|delete config"]);
  }

  public function store(Request $request)
  {
    $request->validate([
      "name" => "required",
      "value" => "required",
    ]);

    $config = Configuration::firstOrNew(["name" => $request->input("name")]);
    $config->name = $request->input("name");
    $config->code = Str::slug($request->input("name"));
    $config->value = $request->input("value");
    $config->save();

    return response("success", 200);
  }

  public function privacyShow(Request $request)
  {
    $configPrivacy = Configuration::where("name", "privacy_content")->firstOrCreate();
    $configTerms = Configuration::where("name", "terms_content")->firstOrCreate();
    return Inertia::render("Admin/Configuration/Privacy")
      ->with("privacy_content", $configPrivacy->value)
      ->with("terms_content", $configTerms->value);
  }

  public function privacyUpdate(Request $request)
  {
    $request->validate(["privacyContent" => "required", "termsContent" => "required"]);

    $config = Configuration::firstOrNew(["name" => "privacy_content"]);
    $config->name = "privacy_content";
    $config->code = "privacy_content";
    $config->value = $request->input("privacyContent");
    $config->save();

    $config = Configuration::firstOrNew(["name" => "terms_content"]);
    $config->name = "terms_content";
    $config->code = "terms_content";
    $config->value = $request->input("termsContent");
    $config->save();

    return redirect()
      ->back()
      ->with("success", "Cambios guardados");
  }

  public function costos()
  {
    $configuration = Configuration::where("code", "costos")->get();
    return Inertia::render("Admin/Configuration/Costos")->with("configuration", $configuration->keyBy("name"));
  }

  public function costosStore(Request $request)
  {
    if ($request->has("costo_envio")) {
      $config = Configuration::firstOrNew(["name" => "costo_envio"]);
      $config->name = "costo_envio";
      $config->code = "costos";
      $config->value = $request->input("costo_envio");
      $config->save();
    }

    return redirect()
      ->back()
      ->with("success", "Cambios guardados");
  }

  public function social()
  {
    $configuration = Configuration::where("code", "social")->get();
    return Inertia::render("Admin/Configuration/Social")->with("configuration", $configuration->keyBy("name"));
  }

  public function socialStore(Request $request)
  {
    if ($request->has("facebook")) {
      $config = Configuration::firstOrNew(["name" => "facebook"]);
      $config->name = "facebook";
      $config->code = "social";
      $config->value = $request->input("facebook");
      $config->save();
    }

    if ($request->has("whatsapp")) {
      $config = Configuration::firstOrNew(["name" => "whatsapp"]);
      $config->name = "whatsapp";
      $config->code = "social";
      $config->value = $request->input("whatsapp");
      $config->save();
    }

    if ($request->has("instagram")) {
      $config = Configuration::firstOrNew(["name" => "instagram"]);
      $config->name = "instagram";
      $config->code = "social";
      $config->value = $request->input("instagram");
      $config->save();
    }

    if ($request->has("twitter")) {
      $config = Configuration::firstOrNew(["name" => "twitter"]);
      $config->name = "twitter";
      $config->code = "social";
      $config->value = $request->input("twitter");
      $config->save();
    }

    if ($request->has("youtube")) {
      $config = Configuration::firstOrNew(["name" => "youtube"]);
      $config->name = "youtube";
      $config->code = "social";
      $config->value = $request->input("youtube");
      $config->save();
    }

    return redirect()
      ->back()
      ->with("success", "Cambios guardados");
  }

  public function sameDayDeliver()
  {
    $configuration = Configuration::where("name", "sdd_start")
      ->orWhere("name", "sdd_end")
      ->get();
    return Inertia::render("Admin/Configuration/Horarios")->with("configuration", $configuration->keyBy("name"));
  }

  public function sameDayDeliverStore(Request $request)
  {
    $config = Configuration::firstOrNew(["name" => "sdd_start"]);
    $config->name = "sdd_start";
    $config->code = "sdd_start";
    $config->value = $request->input("start");
    $config->save();

    $config = Configuration::firstOrNew(["name" => "sdd_end"]);
    $config->name = "sdd_end";
    $config->code = "sdd_end";
    $config->value = $request->input("end");
    $config->save();

    return redirect()->back();
  }

  public function slider()
  {
    $slides = Slide::all();

    return Inertia::render("Admin/Configuration/Slider")->with("slides", SlideResource::collection($slides));
  }

  public function addSlide(Request $request)
  {
    $request->validate([
      "slideText" => "required",
      "slideFile" => "required",
    ]);

    $slide = new Slide();
    $slide->text = $request->input("slideText");
    $slide->created_by = $request->user()->id;
    $slide->save();

    if ($request->hasFile("slideFile")) {
      $slide->addMediaFromRequest("slideFile")->toMediaCollection("banner");
    }

    return redirect()
      ->back()
      ->with("success", "Slide agregado correctamente.");
  }

  public function removeSlide(Request $request, $slideId)
  {
    $slide = Slide::find($slideId);

    if ($slide) {
      $slide->delete();
      return redirect()
        ->back()
        ->with("success", "Banner eliminado correctamente");
    } else {
      return redirect()
        ->back()
        ->with("error", "Ocurrió un problema al eliminar el banner");
    }
  }
}
