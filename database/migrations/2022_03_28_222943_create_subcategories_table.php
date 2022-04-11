<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubcategoriesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("subcategories", function (Blueprint $table) {
      $table->id();
      $table
        ->integer("order_num")
        ->unsigned()
        ->nullable();
      $table->string("name");
      $table->string("slug")->nullable();
      $table->text("excerpt")->nullable();
      $table->longText("description")->nullable();
      $table->text("plain_text_description")->nullable();
      $table->integer("category_id")->unsigned();
      $table->integer("created_by")->unsigned();
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
    Schema::dropIfExists("subcategories");
  }
}
