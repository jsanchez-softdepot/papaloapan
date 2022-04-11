<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentCompleted extends Notification
{
  use Queueable;

  protected $payment;

  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct(Payment $payment)
  {
    $this->payment = $payment;
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
    $subject = "Carnes Papaloapan - Pedido #" . $this->payment->order->consecutive;

    if ($this->payment->status === 1) {
      $subject = $subject . " - Pago Acreditado";
      $line = "Tu pago ha sido acreditado. Para ver el detalle de tu pedido por favor ingresa a la tienda utilizando el siguiente botón:";
    } else {
      $subject = $subject . " - Ocurrió un problema con su pago";
      $line = "Intentamos procesar tu pago, sin embargo ha ocurrido un problema con el mismo. Por favor, revisa el estado de tu pedido utilizando el siguiente botón.";
    }

    return (new MailMessage())
      ->subject($subject)
      ->greeting("Hola " . $notifiable->name)
      ->line($line)
      ->action("Detalle de Pedido #" . $this->payment->order->consecutive, route("profile.orders.detail", $this->payment->order->id))
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
