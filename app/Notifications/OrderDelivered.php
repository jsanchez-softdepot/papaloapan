<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderDelivered extends Notification
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
    return (new MailMessage())
      ->subject("Carnes Papaloapan - Pedido #" . $this->order->consecutive . " - Pedido Entregado")
      ->greeting("Hola " . $notifiable->name)
      ->line("Tu pedido #" . $this->order->consecutive . " ha sido entregado. Si deseas ver los detalles de tu pedido, ingresa a tu cuenta utilizando el siguiente botón.")
      ->action("Detalle de Pedido #" . $this->order->consecutive, route("profile.orders.detail", $this->order->id))
      ->salutation("Carnes Papaloapan agradece tu preferencia.");
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
