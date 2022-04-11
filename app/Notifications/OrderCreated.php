<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderCreated extends Notification
{
  use Queueable;

  protected $order;

  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct(Order $order)
  {
    $this->order = $order;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @param  mixed  $notifiable
   * @return array
   */
  public function via($notifiable)
  {
    return ["mail"];
  }

  /**
   * Get the mail representation of the notification.
   *
   * @param  mixed  $notifiable
   * @return \Illuminate\Notifications\Messages\MailMessage
   */
  public function toMail($notifiable)
  {
    if ($this->order->shipping_method === "PICKUP") {
      $deliverLine = "Puedes recoger tu pedido en la tienda seleccionada.";
    } else {
      $allowSameDayDeliver = $this->order->allow_same_day_deliver;
      $deliverLine = "Tu pedido está programado para entregarse ";
      if ($allowSameDayDeliver) {
        $deliverLine = $deliverLine . "hoy mismo.";
      } else {
        $deliverLine = $deliverLine . "mañana.";
      }
    }

    return (new MailMessage())
      ->subject("Carnes Papaloapan - Pedido #" . $this->order->consecutive . " - Pedido Recibido")
      ->greeting("Hola " . $notifiable->name)
      ->line("Tu pedido ha sido recibido y está siendo procesado en este momento. Puedes consultar el estado de tu pedido ingresando a tu cuenta.")
      ->line($deliverLine)
      ->action("Detalle de Pedido #" . $this->order->consecutive, route("profile.orders.detail", $this->order->id))
      ->line("Recibirás las notificaciones correspondientes cuando el pago haya sido completado y cuando tu pedido esté en camino.")
      ->salutation("Carnes Papaloapan agradece tu preferencia.")
      ->markdown("vendor.notifications.email", ["order" => $this->order]);
  }

  /**
   * Get the array representation of the notification.
   *
   * @param  mixed  $notifiable
   * @return array
   */
  public function toArray($notifiable)
  {
    return [
        //
      ];
  }
}
