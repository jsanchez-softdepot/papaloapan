<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait HasSeo
{
  public function getSeoProperty(string $name = "")
  {
    $seoProp = $this->seoProperties()
      ->where("name", $name)
      ->first();

    if ($seoProp) {
      return $seoProp->content;
    } else {
      return null;
    }
  }
}
