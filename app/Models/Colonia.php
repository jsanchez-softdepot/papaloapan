<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colonia extends Model
{
  use HasFactory;

  protected $fillable = ["name", "city_id", "type", "zipcode_id", "allowed", "allow_sameday_deliver"];

  public function zipcode()
  {
    return $this->belongsTo(ZipCode::class, "zipcode_id");
  }

  public function city()
  {
    return $this->belongsTo(City::class);
  }
}
