<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

use App\Models\City;
use App\Models\Colonia;
use App\Models\ZipCode;

class ZipCodesImport implements ToCollection
{
  /**
   * @param Collection $collection
   */
  public function collection(Collection $rows)
  {
    foreach ($rows as $row) {
      if ($row[0] !== null && $row[1] !== null && $row[2] !== null && $row[3] !== null) {
        // Ciudad
        $city = City::firstOrCreate(["name" => $row[3], "state_id" => 1]);

        // Código Postal
        $zipcode = ZipCode::firstOrCreate([
          "code" => $row[0],
        ]);

        if ($row[15] === "Día siguiente") {
          $allowSameDayDeliver = false;
        } else {
          $allowSameDayDeliver = true;
        }

        // Colonia
        $colonia = Colonia::firstOrCreate([
          "name" => $row[1],
          "type" => $row[2],
          "city_id" => $city->id,
          "zipcode_id" => $zipcode->id,
          "allowed" => true,
          "allow_sameday_deliver" => $allowSameDayDeliver,
        ]);
      }
    }
  }
}
