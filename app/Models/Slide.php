<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Slide extends Model implements HasMedia
{
  use HasFactory, InteractsWithMedia;

  public function registerMediaCollections(): void
  {
    // Imagen para listados
    $this->addMediaCollection("banner")
      ->singleFile()
      ->useFallbackUrl("/static/img/slides/slide_01.jpg");
  }

  public function registerMediaConversions(Media $media = null): void
  {
    $this->addMediaConversion("thumbnail")
      ->width(480)
      ->height(180);
  }
}
