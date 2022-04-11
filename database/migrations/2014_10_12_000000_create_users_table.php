<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("users", function (Blueprint $table) {
      $table->id();
      $table->boolean("is_admin")->default(false);
      $table->boolean("send_notifications")->default(false);
      $table->string("nickname")->nullable();
      $table->string("name");
      $table->string("lastname");
      $table->string("email")->unique();
      $table->string("phone")->nullable();
      $table->timestamp("email_verified_at")->nullable();
      $table->string("password");
      $table->string("conekta_customer_id")->nullable();
      $table->rememberToken();
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
    Schema::dropIfExists("users");
  }
}
