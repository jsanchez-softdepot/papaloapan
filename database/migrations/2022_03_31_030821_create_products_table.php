<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("products", function (Blueprint $table) {
      $table->id();
      $table
        ->integer("order_num")
        ->unsigned()
        ->nullable();
      $table->string("name");
      $table->double("price", 10, 2)->nullable();
      $table->string("slug")->nullable();
      $table->string("sku")->nullable();
      $table->string("cont_neto")->nullable();
      $table
        ->integer("unit_id")
        ->unsigned()
        ->default(1);
      $table->longText("description")->nullable();
      $table
        ->boolean("featured")
        ->nullable()
        ->default(false);
      $table->text("plain_text_description")->nullable();
      $table->string("icono")->nullable();
      $table->string("ubicpieza")->nullable();
      $table->enum("temperaturas", ["FRESCO", "CONGELADO", "AMBOS", "NO APLICA"])->nullable();
      $table->integer("created_by")->unsigned();
      $table->integer("category_id")->unsigned();
      $table->integer("subcategory_id")->unsigned();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists("products");
  }
}
