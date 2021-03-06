<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZipCode extends Model
{
  use HasFactory;

  protected $fillable = ["code"];

  public function colonias()
  {
    return $this->hasMany(Colonia::class, "zipcode_id");
  }
}
