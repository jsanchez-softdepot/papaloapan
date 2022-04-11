<?php

namespace App\Notifications\Admin;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class OrderReceived extends Notification
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
    $htmlLines = new HtmlString("<p>En seguida encontrará los detalles del pedido</p>");

    return (new MailMessage())
      ->subject("Pedido Recibido #" . $this->order->consecutive)
      ->line("Se ha recibido un nuevo pedido a través de la tienda en línea.")
      ->line("Para procesar las pedidos pendientes, por favor ingrese al administrador de la tienda utilizando el siguiente botón:")
      ->markdown("vendor.notifications.order", ["order" => $this->order])
      ->action("Ver Pedido", route("admin.orders.show", $this->order->id))
      ->salutation("¡Saludos!");
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
