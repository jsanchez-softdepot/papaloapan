<?php

namespace App\Http\Resources;

use App\Models\Configuration;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $timeStart = Configuration::where("name", "sdd_start")->first();
    $timeEnd = Configuration::where("name", "sdd_end")->first();

    $timeStartHour = "08";
    $timeStartMinute = "00";
    $timeEndHour = "14";
    $timeEndMinute = "00";

    if ($timeStart) {
      $timeStartParts = \explode(":", $timeStart->value);
      $timeEndParts = \explode(":", $timeEnd->value);

      $timeStartHour = $timeStartParts[0];
      $timeStartMinute = $timeStartParts[1];

      $timeEndHour = $timeEndParts[0];
      $timeEndMinute = $timeEndParts[1];
    }

    $now = Carbon::now();
    $dateStart = Carbon::create($now->year, $now->month, $now->day, $timeStartHour, $timeStartMinute, 0);
    $dateEnd = Carbon::create($now->year, $now->month, $now->day, $timeEndHour, $timeEndMinute, 0);
    $allowSamedayDeliver = false;

    if (!$now->isSaturday() && $this->colonia->allow_sameday_deliver && $now->between($dateStart, $dateEnd)) {
      $allowSamedayDeliver = true;
    }

    return [
      "id" => $this->id,
      "alias" => $this->alias,
      "calle" => $this->calle,
      "num" => $this->num,
      "num_int" => $this->num_int,
      "colonia_name" => $this->colonia->name,
      "colonia_id" => $this->colonia->id,
      "city_name" => $this->colonia->city->name,
      "zipcode" => $this->colonia->zipcode->code,
      "default" => $this->default,
      "allow_sameday_deliver" => $allowSamedayDeliver,
      "allow_nextday_deliver" => true,
      "date_start" => $dateStart,
      "date_end" => $dateEnd,
      "now" => $now,
      "instrucciones" => $this->instrucciones,
    ];
  }
}
