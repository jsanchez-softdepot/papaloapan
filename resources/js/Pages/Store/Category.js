import React from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import Footer from "@/Components/StoreFooter";
import StoreProductCard from "@/Components/StoreProductCard";

export default function Category(props) {
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
            <h3 className="md:mx-auto text-gray-800 text-center font-bold text-2xl">{props.category.name}</h3>

            {/* <CategoryDropdown /> */}
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {props.products.length > 0 &&
              props.products.map((item, index) => {
                return (
                  <div className="shadow-xl text-sm" key={`${item.slug}-${index}`}>
                    <StoreProductCard product={item} />
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </StoreLayout>
  );
}
