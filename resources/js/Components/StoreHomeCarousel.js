import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const StoreHomeCarousel = ({ banners }) => {
  return (
    <div id="home-carousel-cont">
      <Splide
        options={{
          type: "loop",
          rewind: true,
          cover: true,
          height: "700px",
          arrows: false,
          keyboard: false,
        }}
      >
        {banners.length > 0 &&
          banners.map((item, index) => {
            return (
              <SplideSlide key={index.toString()}>
                <img src={item.banner} />
                <div className="caption">
                  <h1>{item.text}</h1>
                </div>
              </SplideSlide>
            );
          })}
        {banners.length < 1 && (
          <>
            <SplideSlide>
              <img src="/static/img/slides/slide_01.jpg" />
              <div className="caption">
                <h1>EL SECRETO ESTÁ EN LA CARNE</h1>
              </div>
            </SplideSlide>
            <SplideSlide>
              <img src="/static/img/slides/slide_02.jpg" />
              <div className="caption">
                <h1>EL SECRETO ESTÁ EN LA CARNE</h1>
              </div>
            </SplideSlide>
          </>
        )}
      </Splide>
    </div>
  );
};

export default StoreHomeCarousel;
