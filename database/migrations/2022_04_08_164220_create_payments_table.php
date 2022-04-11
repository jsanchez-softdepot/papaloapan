<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("payments", function (Blueprint $table) {
      $table->uuid("id");
      $table->double("total", 10, 2);
      $table->tinyInteger("status");
      $table->string("address_street")->nullable();
      $table->string("address_num")->nullable();
      $table->string("address_num_int")->nullable();
      $table->string("address_colonia")->nullable();
      $table->string("address_city")->nullable();
      $table->string("address_state")->nullable();
      $table->string("address_country")->nullable();
      $table->string("address_countrycode")->nullable();
      $table->string("address_zipcode")->nullable();
      $table->integer("payment_method_id")->unsigned();
      $table->text("processor_api_status")->nullable();
      $table->longText("processor_api_response")->nullable();
      $table->string("processor_api_authcode")->nullable();
      $table->string("processor_api_cardinfo")->nullable();
      $table->string("processor_api_created_at")->nullable();
      $table->string("order_id");
      $table
        ->integer("user_id")
        ->unsigned()
        ->nullable();
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
    Schema::dropIfExists("payments");
  }
}
