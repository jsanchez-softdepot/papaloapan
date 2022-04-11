<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
      "payment_method_id" => $this->payment_method_id,
      "created_at" => $this->created_at->format("Y-m-d H:i a"),
      "processor_api_response" => $this->processor_api_response,
      "processor_api_readable_status" => $this->processor_api_readable_status,
      "processor_api_authcode" => $this->processor_api_authcode,
      "processor_api_cardinfo" => $this->processor_api_cardinfo,
      "processor_api_created_at" => $this->processor_api_created_at,
      "status_text" => $this->status_text,
      "status" => $this->status,
    ];
  }
}
