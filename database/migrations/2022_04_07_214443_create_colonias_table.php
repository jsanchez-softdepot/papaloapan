<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColoniasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("colonias", function (Blueprint $table) {
      $table->id();
      $table->string("name");
      $table->string("type")->nullable();
      $table->integer("city_id")->unsigned();
      $table->integer("zipcode_id")->unsigned();
      $table
        ->boolean("allowed")
        ->nullable()
        ->default(false);
      $table
        ->boolean("allow_sameday_deliver")
        ->nullable()
        ->default(false);
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
    Schema::dropIfExists("colonias");
  }
}
