<?php

namespace App\Models;

use App\Traits\HasSeo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Subcategory extends Model implements HasMedia
{
  use HasFactory, InteractsWithMedia, HasSeo, HasSlug, SoftDeletes;

  protected $fillable = ["name", "slug", "excerpt", "description", "plain_text_description", "category_id", "created_by"];

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  public function seoProperties()
  {
    return $this->morphMany(SeoProperty::class, "seoable");
  }

  public function registerMediaCollections(): void
  {
    // Imagen para listados
    $this->addMediaCollection("featuredImage")->singleFile();

    // Cabecera del Template de Categoría
    $this->addMediaCollection("header")->singleFile();
  }

  public function registerMediaConversions(Media $media = null): void
  {
    $this->addMediaConversion("thumbnail")
      ->width(150)
      ->height(150);

    $this->addMediaConversion("small")
      ->width(400)
      ->height(400);

    $this->addMediaConversion("medium")
      ->width(800)
      ->height(800);
  }

  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom("name")
      ->saveSlugsTo("slug");
  }
}
