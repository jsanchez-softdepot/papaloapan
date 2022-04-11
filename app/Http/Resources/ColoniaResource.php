<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ColoniaResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      "name" => $this->name,
      "city_name" => $this->city ? $this->city->name : "",
    ];
  }
}
