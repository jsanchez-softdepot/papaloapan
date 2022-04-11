<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    User::truncate();

    $u = User::create([
      "is_admin" => true,
      "nickname" => "Jesús Sánchez",
      "name" => "Jesús",
      "lastname" => "Sánchez",
      "email" => "j.sanchez@softdepot.mx",
      "phone" => "8117445060",
      "password" => bcrypt("Externo2021"),
    ]);

    $u->assignRole("superadmin");
  }
}
