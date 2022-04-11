<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    $breadcrumbs = [
      ["url" => route("admin.index"), "name" => "Dashboard"],
      ["url" => route("admin.users.index"), "name" => "Usuarios"],
      ["url" => route("admin.users.create"), "name" => "Crear"],
    ];

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
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \Spatie\Permission\Models\Role  $role
   * @return \Illuminate\Http\Response
   */
  public function show(Role $role)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \Spatie\Permission\Models\Role  $role
   * @return \Illuminate\Http\Response
   */
  public function edit(Role $role)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Spatie\Permission\Models\Role  $role
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Role $role)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \Spatie\Permission\Models\Role  $role
   * @return \Illuminate\Http\Response
   */
  public function destroy(Role $role)
  {
    //
  }
}
