import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { Link, useForm } from "@inertiajs/inertia-react";

const StoreProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { post } = useForm();

  const _handleAddToCart = () => {
    console.log("Add To Cart");

    post(route("store.cart.add", { product: product, qty: 1 }), {
      preserveScroll: true,
    });
  };

  return (
    <div className="shadow-xl text-sm">
      <Link href={product.path}>
        <img src={product.featured_image_url} alt="" className="w-full h-auto rounded-t" />
      </Link>
      <div className="p-5">
        <Link to={product.path}>
          <div className="flex justify-between items-center">
            <h4 className="font-bold">{product.name}</h4>
            <span className="text-xs">{product.cont_neto}</span>
          </div>
          <span className="text-red-700 font-bold">{numeral(product.price).format("$ 0,000.00")}</span>
        </Link>

        <Link
          as="button"
          preserveScroll={true}
          onClick={(e) => {
            e.preventDefault();
            _handleAddToCart();
          }}
          href="#"
          className={`block text-center mx-2 mt-2 rounded-md py-2 px-6 font-medium text-xs border ${isAdded ? `border-gray text-gray-400` : `border-black text-black`}`}
        >
          {isAdded ? `Agregado al Carrito` : `Agregar al Carrito`}
        </Link>
      </div>
    </div>
  );
};

export default StoreProductCard;
