<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $featuredImageMd = $this->getFirstMediaUrl("featuredImage", "medium");
    $featuredImageUrl = $this->getFirstMediaUrl("featuredImage", "thumbnail");

    $galleryFiles = [];
    $galleryMedia = $this->getMedia("gallery");

    foreach ($galleryMedia as $media) {
      $galleryFiles[] = [
        "url" => $media->getFullUrl(),
        "uuid" => $media->uuid,
      ];
    }

    $path = "/" . $this->category->slug . "/" . $this->subcategory->slug . "/" . $this->slug;

    $breadcrumbs = [["name" => $this->category->name, "url" => "/categoria/" . $this->category->slug], ["name" => $this->subcategory->name, "url" => "#"]];

    $usoIcos = collect();

    if (Str::contains($this->icono, "Asador")) {
      $usoIcos->add("uso_asador.png");
    }

    if (Str::contains($this->icono, "Ahumador")) {
      $usoIcos->add("uso_ahumador.png");
    }

    if (Str::contains($this->icono, "Sartén")) {
      $usoIcos->add("uso_sarten.png");
    }

    if (Str::contains($this->icono, "Horno")) {
      $usoIcos->add("uso_horno.png");
    }

    return [
      "id" => $this->id,
      "path" => $path,
      "name" => $this->name,
      "description" => $this->description,
      "slug" => $this->slug,
      "icono" => $this->icono,
      "icos" => $usoIcos,
      "created_at" => $this->created_at->format("d-M-Y - h:ia"),
      "featured_image_thumbnail_url" => $featuredImageUrl,
      "featured_image_url" => $featuredImageMd,
      "category_name" => $this->category->name,
      "category_id" => $this->category_id,
      "subcategory_id" => $this->subcategory_id,
      "subcategory_name" => $this->subcategory->name,
      "cont_neto" => $this->cont_neto,
      "unit_id" => $this->unit_id,
      "unit" => $this->unit,
      "temperature" => $this->temperaturas,
      "sku" => $this->sku,
      "price" => $this->price,
      "featured" => $this->featured,
      "breadcrumbs" => $breadcrumbs,
      "media" => [
        "featured" => [
          "thumbnail" => $featuredImageUrl,
          "medium" => $featuredImageMd,
          "original" => $this->getFirstMediaUrl("featuredImage"),
        ],
        "gallery" => $galleryFiles,
      ],
      "seo" => [
        "title" => $this->getSeoProperty("title"),
        "description" => $this->getSeoProperty("description"),
        "keywords" => $this->getSeoProperty("keywords"),
      ],
    ];
  }
}
