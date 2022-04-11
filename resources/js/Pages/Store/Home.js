import React from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import StoreHomeCarousel from "@/Components/StoreHomeCarousel";
import StoreCategoriesCarousel from "@/Components/StoreCategoriesCarousel";
import StoreFeaturedProductsCarousel from "@/Components/StoreFeaturedProductsCarousel";

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
      <StoreHomeCarousel banners={props.banners} />

      <section id="home-categories" className="my-6">
        <div className="container mx-auto">
          <StoreCategoriesCarousel categories={props.categories} />
        </div>
      </section>

      <section id="featured-products" className="mt-20">
        <div className="container mx-auto">
          <h2 className="mx-auto mb-6 text-xl text-center font-medium block">Productos Destacados</h2>

          <StoreFeaturedProductsCarousel products={props.featuredProducts} />
        </div>
      </section>
    </StoreLayout>
  );
}
