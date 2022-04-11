<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.users.index"), "name" => "Usuarios"]];
    $users = User::all();
    $roles = Role::all();

    $users->load(["roles"]);

    return Inertia::render("Admin/Users/UsersIndex")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("users", $users)
      ->with("roles", $roles);
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
      ["url" => route("admin.users.index"), "name" => "Usuarios"],
      ["url" => route("admin.users.create"), "name" => "Crear"],
    ];

    $roles = Role::all();

    return Inertia::render("Admin/Users/UserCreate")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("roles", $roles);
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
      "name" => "required",
      "role" => ["required"],
      "lastname" => "required",
      "email" => "required|email|unique:users",
      "password" => "required|confirmed",
    ]);

    try {
      $u = new User();
      $u->is_admin = $request->input("is_admin", false);
      $u->name = $request->input("name");
      $u->lastname = $request->input("lastname");
      $u->email = $request->input("email");
      $u->phone = $request->input("phone");
      $u->password = $request->input("password");
      $u->save();

      $u->assignRole($request->input("role"));
    } catch (Throwable $e) {
      Log::info($e->getMessage());
    }

    return redirect()->route("admin.users.index");
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function show(User $user)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function edit(User $user)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, User $user)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user)
  {
    //
  }
}
