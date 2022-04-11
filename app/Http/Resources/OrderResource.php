<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $validPayments = $this->payments->filter(function ($q) {
      return $q->status === 1;
    });

    $shippingMethodName = $this->shipping_method === "DELIVERY" ? "Envío a Domicilio" : "Recoge en Tienda";

    $calcSubtotal = 0;

    foreach ($this->items as $oItem) {
      $oItemSubtotal = $oItem->price * $oItem->quantity;
      $calcSubtotal = $calcSubtotal + $oItemSubtotal;
    }

    if ($this->guestmode === 1) {
      $clientName = $this->address_receiver;
    } else {
      $clientName = $this->user->name . " " . $this->user->lastname;
    }

    if ($this->sap_order_id !== null && $this->sap_order_id > 0) {
      $sapStatusText = "Enviado";
    } else {
      $sapStatusText = "No procesado";
    }

    return [
      "guestmode" => \boolval($this->guestmode),
      "id" => $this->id,
      "items" => $this->items,
      "client_name" => $clientName,
      "status_text" => $this->status_text,
      "status_color" => $this->status_color,
      "payments" => PaymentResource::collection($this->payments),
      "has_valid_payment" => $validPayments->count() > 0,
      "client" => $this->user,
      "shipping_method" => $shippingMethodName,
      "shipping_amount" => $this->shipping_amount,
      "payment_method_name" => $this->paymentMethod->name,
      "payment_method_id" => $this->payment_method_id,
      "status" => $this->status,
      "subtotal" => $calcSubtotal,
      "total" => $this->total,
      "consecutive" => $this->consecutive,
      "shipping_address" => [
        "receiver" => $this->address_receiver,
        "phone" => $this->address_phone,
        "email" => $this->address_email,
        "street" => $this->address_street,
        "num" => $this->address_num,
        "colonia" => $this->address_colonia,
        "city" => $this->address_city,
        "state" => $this->address_state,
        "zipcode" => $this->address_zipcode,
      ],
      "completed_by" => $this->completedBy ? $this->completedBy->name : "NA",
      "confirmed_by" => $this->confirmedBy ? $this->confirmedBy->name : "NA",
      "cancelled_by" => $this->cancelledBy ? $this->cancelledBy->name : "NA",
      "confirmed_at" => $this->confirmed_at ? $this->confirmed_at->format("Y-m-d H:i") : "NA",
      "cancelled_at" => $this->cancelled_at ? $this->cancelled_at->format("Y-m-d H:i") : "NA",
      "completed_at" => $this->completed_at ? $this->completed_at->format("Y-m-d H:i") : "NA",
      "created_at" => $this->created_at ? $this->created_at->format("Y-m-d H:i") : "NA",
      "sap" => $this->sap,
      "sap_status_text" => $sapStatusText,
      "sap_order_id" => $this->sap_order_id,
    ];
  }
}
