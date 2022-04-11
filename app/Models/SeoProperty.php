<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoProperty extends Model
{
  use HasFactory;
  protected $fillable = ["name", "content", "seoable_type", "seoable_id"];
}
