<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("addresses", function (Blueprint $table) {
      $table->id();
      $table->boolean("default")->default(false);
      $table->string("alias");
      $table->string("calle");
      $table->string("num");
      $table->string("num_int")->nullable();
      $table->text("instrucciones")->nullable();
      $table->integer("colonia_id")->unsigned();
      $table
        ->string("type")
        ->nullable()
        ->default("SHIPPING"); // SHIPPING | BILLING
      $table->integer("user_id")->unsigned();
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
    Schema::dropIfExists("addresses");
  }
}
