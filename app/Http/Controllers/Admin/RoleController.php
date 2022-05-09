<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Throwable;

class RoleController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $roles = Role::all();
    $roles->load(["permissions"]);

    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.roles.index"), "name" => "Roles"]];

    return Inertia::render("Admin/Roles/RoleIndex")
      ->with("roles", $roles)
      ->with("breadcrumbs", $breadcrumbs);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $permissions = Permission::all();
    $breadcrumbs = [
      ["url" => route("admin.index"), "name" => "Dashboard"],
      ["url" => route("admin.roles.index"), "name" => "Roles"],
      ["url" => route("admin.roles.create"), "name" => "Crear Rol"],
    ];

    return Inertia::render("Admin/Roles/RoleCreate")
      ->with("permissions", $permissions)
      ->with("breadcrumbs", $breadcrumbs);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
      "name" => ["required", "unique:roles"],
      "permissions" => ["array"],
    ]);

    DB::beginTransaction();

    try {
      $r = new Role();
      $r->name = $request->input("name");
      $r->save();

      $r->givePermissionTo($request->input("permissions"));

      DB::commit();
    } catch (Throwable $e) {
      DB::rollBack();
      Log::info($e->getMessage());
    }

    return redirect()->route("admin.roles.index");
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \Spatie\Permission\Models\Role  $role
   * @return \Illuminate\Http\Response
   */
  public function destroy(Role $role)
  {
    $role->delete();

    return redirect()->back();
  }
}
