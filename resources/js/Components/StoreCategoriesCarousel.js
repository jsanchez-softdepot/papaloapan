import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CategorySplide from "./StoreCategorySplide";

const StoreCategoriesCarousel = ({ categories }) => {
  return (
    <div id="categories-carousel-cont">
      <Splide
        options={{
          rewind: true,
          pagination: false,
          cover: true,
          height: "400px",
          perPage: 3,
          perMove: 1,
          gap: 30,
          keyboard: false,
          breakpoints: {
            992: {
              perPage: 2,
              gap: 30,
            },
            676: {
              perPage: 1,
              gap: 30,
            },
          },
        }}
      >
        {categories.length > 0 &&
          categories.map((item) => (
            <SplideSlide key={item.slug}>
              <img src={item.media.featured.medium} alt={item.name} />
              <CategorySplide category={item} />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};

export default StoreCategoriesCarousel;
