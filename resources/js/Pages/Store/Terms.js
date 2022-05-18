import React from "react";
import { Head } from "@inertiajs/inertia-react";
import StoreLayout from "@/Layouts/StoreLayout";

export default function Terms(props) {
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
      <div className="container mx-auto px-5">
        <main className="pt-48">
          <div className="flex items-center justify-between">
            <h3 className="md:mx-auto text-gray-800 text-center font-bold text-2xl">Términos y Condiciones</h3>

            {/* <CategoryDropdown /> */}
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.configs.terms_content.value }}></div>
        </main>
      </div>
    </StoreLayout>
  );
}
