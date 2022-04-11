<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\PaymentMethod;
use App\Models\State;
use App\Models\Subcategory;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $this->call(RoleAndPermissionSeeder::class);
    $this->call(UserSeeder::class);

    // Category::create(["name" => "Res", "slug" => "res", "created_by" => 1]);
    // Category::create(["name" => "Pollo", "slug" => "pollo", "created_by" => 1]);
    // Category::create(["name" => "Cerdo", "slug" => "cerdo", "created_by" => 1]);

    // Subcategory::create(["name" => "Subcat 1", "category_id" => 1, "slug" => "subcat-1", "created_by" => 1]);
    // Subcategory::create(["name" => "Subcat 2", "category_id" => 1, "slug" => "subcat-2", "created_by" => 1]);
    // Subcategory::create(["name" => "Subcat 3", "category_id" => 2, "slug" => "subcat-3", "created_by" => 1]);
    // Subcategory::create(["name" => "Subcat 4", "category_id" => 3, "slug" => "subcat-4", "created_by" => 1]);
    // Subcategory::create(["name" => "Subcat 5", "category_id" => 3, "slug" => "subcat-5", "created_by" => 1]);

    // \App\Models\User::factory(10)
    //   ->create()
    //   ->each(function ($u) {
    //     $u->assignRole("client");
    //   });

    State::create(["name" => "Veracruz"]);

    PaymentMethod::create(["name" => "Tarjeta de Crédito / Débito", "code" => "PAYMENT_CREDIT_CARD"]);
    PaymentMethod::create(["name" => "Contra Entrega", "code" => "PAYMENT_ON_DELIVERY"]);

    Unit::create(["name" => "Kilogramo", "abbr" => "KG"]);
    Unit::create(["name" => "Paquete", "abbr" => "PAQ"]);
  }
}
