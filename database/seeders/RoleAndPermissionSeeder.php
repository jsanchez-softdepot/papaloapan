<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Schema::disableForeignKeyConstraints();

    Permission::truncate();
    Role::truncate();
    DB::table("role_has_permissions")->truncate();
    DB::table("model_has_permissions")->truncate();
    DB::table("model_has_roles")->truncate();

    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    $entities = ["product", "user", "category", "subcategory", "order", "config", "location"];
    $verbs = ["create", "read", "update", "delete"];

    foreach ($entities as $e) {
      foreach ($verbs as $v) {
        Permission::create(["name" => $v . " " . $e]);
      }
    }

    $superadmin = Role::create(["name" => "superadmin"]);
    $superadmin->givePermissionTo(Permission::all());

    $client = Role::create(["name" => "client"]);

    Schema::enableForeignKeyConstraints();
  }
}
