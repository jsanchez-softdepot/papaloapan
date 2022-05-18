import React from "react";
import { Head } from "@inertiajs/inertia-react";
import StoreLayout from "@/Layouts/StoreLayout";

export default function Home(props) {
  return (
    <StoreLayout
      auth={props.auth}
      errors={props.errors}
      categories={props.categories}
      cart={props.cart}
      cartTotal={props.cartTotal}
      cartSubtotal={props.cartSubtotal}
      configs={props.configs}
    >
      <h1>Aviso de Privacidad</h1>
      <div dangerouslySetInnerHTML={{ __html: props.configs.privacy_content.value }}></div>
    </StoreLayout>
  );
}
