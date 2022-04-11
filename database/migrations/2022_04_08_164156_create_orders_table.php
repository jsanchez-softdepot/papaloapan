<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("orders", function (Blueprint $table) {
      $table->uuid("id")->primary();
      $table->tinyInteger("status");
      $table->double("total", 10, 2);
      $table->integer("consecutive")->unsigned();
      $table->double("shipping_amount", 10, 2)->nullable();
      $table->string("shipping_method")->nullable();
      $table->integer("payment_method_id")->unsigned();
      $table
        ->boolean("allow_same_day_deliver")
        ->nullable()
        ->default(false);
      $table->string("address_receiver")->nullable();
      $table->string("address_phone")->nullable();
      $table->text("address_instrucciones")->nullable();
      $table->string("address_email")->nullable();
      $table->string("address_street")->nullable();
      $table->string("address_num")->nullable();
      $table->string("address_num_int")->nullable();
      $table->string("address_colonia")->nullable();
      $table->string("address_city")->nullable();
      $table->string("address_state")->nullable();
      $table->string("address_country")->nullable();
      $table->string("address_countrycode")->nullable();
      $table->string("address_zipcode")->nullable();
      $table
        ->integer("user_id")
        ->unsigned()
        ->nullable();
      $table->boolean("guestmode")->default(false);
      $table
        ->integer("completed_by")
        ->unsigned()
        ->nullable();
      $table
        ->integer("confirmed_by")
        ->unsigned()
        ->nullable();
      $table
        ->integer("cancelled_by")
        ->unsigned()
        ->nullable();
      $table->dateTime("completed_at")->nullable();
      $table->dateTime("confirmed_at")->nullable();
      $table->dateTime("cancelled_at")->nullable();
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
    Schema::dropIfExists("orders");
  }
}
