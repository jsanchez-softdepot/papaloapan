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

class Product extends Model implements HasMedia
{
  use HasFactory, HasSeo, InteractsWithMedia, HasSlug, SoftDeletes;

  protected $fillable = [
    "name",
    "slug",
    "sku",
    "price",
    "cont_neto",
    "category_id",
    "subcategory_id",
    "description",
    "plain_text_description",
    "created_by",
    "featured",
    "unit_id",
    "temperaturas"
  ];

  public function unit()
  {
    return $this->belongsTo(Unit::class);
  }

  public function seoProperties()
  {
    return $this->morphMany(SeoProperty::class, "seoable");
  }

  public function registerMediaCollections(): void
  {
    // Imagen para listados
    $this->addMediaCollection("featuredImage")
      ->singleFile()
      ->useFallbackUrl("/static/img/placeholder-image.png");

    // Galería de Productos
    $this->addMediaCollection("gallery")->useFallbackUrl("/static/img/placeholder-image.png");
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

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  public function subcategory()
  {
    return $this->belongsTo(Subcategory::class);
  }

  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom("name")
      ->saveSlugsTo("slug");
  }
}
