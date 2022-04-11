<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    $featuredImageMd = $this->getFirstMediaUrl("featuredImage", "medium");
    $featuredImageUrl = $this->getFirstMediaUrl("featuredImage", "thumbnail");

    return [
      "id" => $this->id,
      "name" => $this->name,
      "description" => $this->description,
      "slug" => $this->slug,
      "created_at" => $this->created_at->format("d-M-Y - h:ia"),
      "media" => [
        "featured" => [
          "thumbnail" => $featuredImageUrl,
          "medium" => $featuredImageMd,
        ],
      ],
      "url" => url("/categorias/" . $this->slug),
      "seo" => [
        "title" => $this->getSeoProperty("title"),
        "description" => $this->getSeoProperty("description"),
        "keywords" => $this->getSeoProperty("keywords"),
      ],
    ];
  }
}
