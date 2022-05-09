<?php

namespace App\Models;

use App\Notifications\PaymentCompleted;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Conekta\Conekta;
use Conekta\Customer;
use Conekta\Handler;
use Conekta\Order as ConektaOrder;
use Conekta\ParameterValidationError;
use Conekta\ProcessingError;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;

class Order extends Model
{
  use HasFactory, Uuids;

  protected $dates = ["confirmed_at", "cancelled_at", "completed_at"];
  protected $appends = ["status_text", "status_color"];

  public function paymentMethod()
  {
    return $this->belongsTo(PaymentMethod::class);
  }

  public function items()
  {
    return $this->hasMany(OrderItem::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function completedBy()
  {
    return $this->belongsTo(User::class, "completed_by");
  }

  public function confirmedBy()
  {
    return $this->belongsTo(User::class, "confirmed_by");
  }

  public function cancelledBy()
  {
    return $this->belongsTo(User::class, "cancelled_by");
  }

  public function getStatusTextAttribute()
  {
    switch ($this->status) {
      case 0:
        return "Pendiente";
        break;
      case 1:
        return "Confirmado";
        break;
      case 2:
        return "En camino";
        break;
      case 3:
        return "Entregado";
        break;
      case 4:
        return "Finalizado";
        break;
      case 99:
        return "Cancelado";
        break;
    }
  }

  public function getStatusColorAttribute()
  {
    switch ($this->status) {
      case 0:
        return "warning";
        break;
      case 1:
        return "primary";
        break;
      case 2:
        return "info";
        break;
      case 3:
        return "success";
        break;
      case 4:
        return "dark";
        break;
      case 99:
        return "danger";
        break;
    }
  }

  public function payments()
  {
    return $this->hasMany(Payment::class);
  }

  public static function boot()
  {
    parent::boot();
    self::creating(function ($model) {
      $model->consecutive = $model->max("consecutive") + 1;
    });
  }

  public function processConektaPayment(Payment $payment, $token)
  {
    Log::info("Intentando pago con token: " . $token);
    Log::info("Conekta Private Key:" . env("CONEKTA_PRIVATE_KEY"));
    Log::info([
      "name" => $this->address_receiver,
      "email" => $this->address_email,
      "phone" => $this->address_phone,
      "payment_sources" => [["type" => "card", "token_id" => $token]],
    ]);

    Conekta::setApiKey(env("CONEKTA_PRIVATE_KEY"));
    Conekta::setApiVersion("2.0.0");

    try {
      $customer = Customer::create([
        "name" => $this->address_receiver,
        "email" => $this->address_email,
        "phone" => $this->address_phone,
        "payment_sources" => [["type" => "card", "token_id" => $token]],
      ]);
    } catch (ProcessingError $error) {
      Log::info($error);
      return response($error->getMessage(), 500);
    } catch (ParameterValidationError $error) {
      Log::info($error);
      return response($error->getMessage(), 500);
    } catch (Handler $error) {
      Log::info($error);
      return response($error->getMessage(), 500);
    } catch (Throwable $error) {
      Log::info($error);
      return response($error->getMessage(), 500);
    }

    $cnktItems = [];

    foreach ($this->items as $oItem) {
      $cnktItems[] = [
        "name" => $oItem->name,
        "unit_price" => round($oItem->price * 100, 2, PHP_ROUND_HALF_UP),
        "quantity" => $oItem->quantity,
      ];
    }

    $shippingAmount = $this->shipping_amount * 100;

    try {
      $cnktOrder = ConektaOrder::create([
        "line_items" => $cnktItems,
        "shipping_lines" => [
          [
            "amount" => $shippingAmount,
            "carrier" => "TERRESTRE",
          ],
        ],
        "currency" => "MXN",
        "customer_info" => [
          "customer_id" => $customer->id,
        ],
        "shipping_contact" => [
          "receiver" => $this->address_receiver,
          "phone" => $this->address_phone,
          "address" => [
            "street1" => $payment->address_street . " " . $payment->address_num,
            "postal_code" => \strval($payment->address_zipcode),
            "country" => "MX",
          ],
        ],
        "metadata" => ["reference" => $this->id, "more_info" => "Pago por productos Carnicería Papaloapan"],
        "charges" => [
          [
            "payment_method" => [
              "type" => "default",
            ],
          ],
        ],
      ]);

      $payment->processor_api_response = $cnktOrder;
      $payment->processor_api_status = $cnktOrder->payment_status;
      $payment->processor_api_authcode = $cnktOrder->charges[0]->payment_method->auth_code;
      $payment->processor_api_created_at = $cnktOrder->charges[0]->created_at;
      $payment->processor_api_cardinfo =
        $cnktOrder->charges[0]->payment_method->exp_month . " / " . $cnktOrder->charges[0]->payment_method->exp_year . " - " . $cnktOrder->charges[0]->payment_method->last4;

      switch ($cnktOrder->payment_status) {
        case "pending_payment":
        case "declined":
        case "expired":
        case "refunded":
        case "partially_refunded":
        case "charged_back":
        case "pre_authorized":
        case "voided":
          $payment->status = 0;
          break;
        case "paid":
          $payment->status = 1;
          //ProcessOrder::dispatch($payment->order);
          break;
      }

      $payment->save();

      if (Auth::check()) {
        $user = User::find(Auth::id());
        $user->notify(new PaymentCompleted($payment));
      } else {
        $user = new User();
        $user->name = $this->address_receiver;
        $user->email = $this->address_email;

        $user->notify(new PaymentCompleted($payment));
      }
    } catch (ProcessingError $error) {
      Log::info("Processing Error");
      Log::error($error);
      return response()->json(
        [
          "error" => [
            "message" => $error->getMessage(),
            "type" => "processing_error",
          ],
        ],
        500
      );
    } catch (ParameterValidationError $error) {
      Log::info("Param Validation Error");
      Log::error($error);
      return response()->json(
        [
          "error" => [
            "message" => $error->getMessage(),
            "type" => "parameter_validation",
          ],
        ],
        500
      );
    } catch (Handler $error) {
      Log::info("Handler Error");
      Log::error($error);
      return response()->json(
        [
          "error" => [
            "message" => $error->getMessage(),
            "type" => "handler",
          ],
        ],
        500
      );
    } catch (Throwable $error) {
      Log::info("Throwable Error");
      Log::error($error);
      return response()->json(
        [
          "error" => [
            "message" => $error->getMessage(),
            "type" => "throwable",
          ],
        ],
        500
      );
    }
  }
}
