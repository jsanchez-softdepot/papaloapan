<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;

class UserController extends Controller
{
  public function __construct()
  {
    $this->middleware(["role:superadmin", "permission:create user|read user|edit user|update user|delete user"]);
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $breadcrumbs = [["url" => route("admin.index"), "name" => "Dashboard"], ["url" => route("admin.users.index"), "name" => "Usuarios"]];
    $users = User::orderBy("created_at", "ASC")->paginate(100);
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
      $u->password = bcrypt($request->input("password"));
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
    $breadcrumbs = [
      ["url" => route("admin.index"), "name" => "Dashboard"],
      ["url" => route("admin.users.index"), "name" => "Usuarios"],
      ["url" => route("admin.users.edit", $user->id), "name" => "Editar Usuario"],
    ];

    $roles = Role::all();

    $user->load(["roles"]);

    return Inertia::render("Admin/Users/UserEdit")
      ->with("breadcrumbs", $breadcrumbs)
      ->with("roles", $roles)
      ->with("user", $user);
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
    if (Auth::user()->can("update user")) {
      $request->validate([
        "name" => "required",
        "role" => "required",
        "lastname" => "required",
        "email" => ["sometimes", "required", "email", Rule::unique("users")->ignore($user->id)],
        "password" => "sometimes|confirmed",
      ]);

      $user->update([
        "name" => $request->input("name"),
        "lastname" => $request->input("lastname"),
        "phone" => $request->input("phone"),
        "email" => $request->input("email"),
        "password" => bcrypt($request->input("password")),
        "send_notifications" => $user->send_notifications,
      ]);

      if ($request->filled("password") && $request->filled("password_confirmation")) {
        $user->password = bcrypt($request->input("password"));
      }

      $user->roles()->detach();

      $user->assignRole($request->input("role"));

      return redirect()->back();
    } else {
      return response("not authorized", 403);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user)
  {
    if (Auth::user()->can("delete user")) {
      $user->delete();
    }

    return redirect()->back();
  }
}
