<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
  use HasFactory;

  protected $fillable = ["default", "alias", "calle", "num", "num_int", "instrucciones", "colonia_id", "type", "user_id"];

  public function colonia()
  {
    return $this->belongsTo(Colonia::class);
  }

  //   public function allowSameDayDeliver()
  //   {
  //     $timeStart = Configuration::where("name", "sdd_start")->first();
  //     $timeEnd = Configuration::where("name", "sdd_end")->first();

  //     $timeStartHour = "08";
  //     $timeStartMinute = "00";
  //     $timeEndHour = "14";
  //     $timeEndMinute = "00";

  //     if ($timeStart) {
  //       $timeStartParts = \explode(":", $timeStart->value);
  //       $timeEndParts = \explode(":", $timeEnd->value);

  //       $timeStartHour = $timeStartParts[0];
  //       $timeStartMinute = $timeStartParts[1];

  //       $timeEndHour = $timeEndParts[0];
  //       $timeEndMinute = $timeEndParts[1];
  //     }

  //     $now = Carbon::now();
  //     $dateStart = Carbon::create($now->year, $now->month, $now->day, $timeStartHour, $timeStartMinute, 0);
  //     $dateEnd = Carbon::create($now->year, $now->month, $now->day, $timeEndHour, $timeEndMinute, 0);
  //     $allowSamedayDeliver = false;

  //     if (!$now->isSaturday() && $this->colonia->allow_sameday_deliver && $now->between($dateStart, $dateEnd)) {
  //       $allowSamedayDeliver = true;
  //     }

  //     return $allowSamedayDeliver;
  //   }
}
