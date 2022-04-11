import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import StoreProductCard from "./StoreProductCard";

const StoreFeaturedProductsCarousel = ({ products }) => {
  return (
    <div id="featured-products-carousel-cont">
      <Splide
        options={{
          arrows: false,
          pagination: false,
          autoHeight: true,
          perPage: 5,
          perMove: 1,
          gap: 30,
          keyboard: false,
          rewind: true,
          padding: {
            left: 0,
            right: 60,
          },
          breakpoints: {
            992: {
              perPage: 3,
              gap: 30,
            },
            676: {
              perPage: 2,
              gap: 30,
            },
          },
        }}
      >
        {products.length > 0 &&
          products
            .filter((item) => item.featured === 1)
            .map((item) => {
              return (
                <SplideSlide key={item.slug}>
                  <StoreProductCard product={item} />
                </SplideSlide>
              );
            })}
      </Splide>
    </div>
  );
};

export default StoreFeaturedProductsCarousel;
