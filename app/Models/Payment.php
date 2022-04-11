<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
  use HasFactory, Uuids;

  protected $casts = [
    "processor_api_response" => "object",
  ];

  protected $appends = ["processor_api_readable_status", "status_text"];

  public function getStatusTextAttribute()
  {
    if ($this->status === 1) {
      return "Pagado";
    } else {
      return "No acreditado";
    }
  }

  public function getProcessorApiReadableStatusAttribute()
  {
    switch ($this->processor_api_status) {
      case "pending_payment":
        return "Pendiente";
        break;
      case "declined":
        return "Declinado";
        break;
      case "expired":
        return "Expirado";
        break;
      case "paid":
        return "Pagado";
        break;
      case "refunded":
        return "Reembolsado";
        break;
      case "partially_refunded":
        return "Reembolsado Parcialmente";
        break;
      case "charged_back":
        return "Charged Back";
        break;
      case "pre_authorized":
        return "Preautorizado";
        break;
      case "voided":
        return "Voided";
        break;
      default:
        return "No registrado";
    }
  }

  public function order()
  {
    return $this->belongsTo(Order::class);
  }
}
