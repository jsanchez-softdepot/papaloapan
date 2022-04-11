@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}
@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php switch ($level) {
  case "success":
  case "error":
    $color = $level;
    break;
  default:
    $color = "primary";
} ?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

@component('mail::table')
| # | Producto | Cantidad | Precio |
| - |:-------- |:--------:| ------:|
@foreach($order->items as $oItem)
| {{ $loop->iteration }} | {{ $oItem->name }} | {{ $oItem->quantity }} | $ {{ number_format($oItem->price,2) }} |
@endforeach
| | | Envío | $ {{ number_format($order->shipping_amount,2) }}
| | | Total | $ {{ number_format($order->total,2) }}
@endcomponent

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Regards'),<br>
{{ config('app.name') }}
@endif

{{-- Subcopy --}}
@isset($actionText)
@slot('subcopy')
@lang(
    "Si tienes problemas para acceder usando el botón \":actionText\", copia y pega la siguiente URL\n".
    'en tu navegador:',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
@endslot
@endisset
@endcomponent
