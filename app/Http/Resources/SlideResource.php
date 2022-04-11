<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SlideResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    // $imgMd = $this->getFirstMediaUrl("banner", "medium");
    // $imgTh = $this->getFirstMediaUrl("banner", "thumbnail");

    return [
      "id" => $this->id,
      "text" => $this->text,
      "location" => $this->location,
      "banner" => $this->getFirstMediaUrl("banner"),
    ];
  }
}
