<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("order_items", function (Blueprint $table) {
      $table->id();
      $table->string("name");
      $table->double("price", 10, 2)->nullable();
      $table->integer("quantity")->unsigned();
      $table->double("subtotal", 10, 2)->nullable();
      $table->string("sku")->nullable();
      $table->string("cont_neto")->nullable();
      $table->string("unit_abbr")->nullable();
      $table->string("temperatura")->nullable();
      $table->string("category_name")->nullable();
      $table->string("subcategory_name")->nullable();
      $table->text("attributes")->nullable();
      $table->string("order_id");
      $table->integer("product_id")->unsigned();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists("order_items");
  }
}
