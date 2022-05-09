<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function __construct()
  {
  }

  public function index()
  {
    // Inertia::setRootView("admin");
    if (!Auth::check() || !Auth::user()->is_admin) {
      abort(401, "No autorizado");
    }

    return Inertia::render("Admin/Dashboard");
  }
}
