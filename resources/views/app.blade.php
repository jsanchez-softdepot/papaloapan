<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('static/css/tiendapapaloapan.css') }}">

        <script>
            var CONEKTA_PUBLIC_KEY = '{{ env('CONEKTA_PUBLIC_KEY') }}';
        </script>

        <!-- Scripts -->
        @routes
        <script src="{{ mix('static/js/tiendapapaloapan.js') }}" defer></script>
        @inertiaHead()
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
