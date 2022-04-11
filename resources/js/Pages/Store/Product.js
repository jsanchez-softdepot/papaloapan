import React, { useState } from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import numeral from "numeral";

const ProductTempInput = ({ temp, currentVal, onChange }) => {
  return (
    <div className="flex items-center justify-start gap-2 mb-1 text-sm">
      <input type="radio" name="temperatura" value={temp.toUpperCase()} checked={temp.toLowerCase() === currentVal.toLowerCase()} onChange={onChange} />
      <span>{temp}</span>
    </div>
  );
};

export default function Product(props) {
  const { post } = useForm();

  const [productDetails, setProductDetails] = useState(null);
  const [qty, setQty] = useState(1);
  const [temperature, setTemperature] = useState("CONGELADO");

  const [currentImgUrl, setCurrentImgUrl] = useState(props.product.media.featured.original);

  const _handleTemperatureChange = (e) => {
    console.log("Temperature Change");
    console.log(e.target.value);
    setTemperature(e.target.value);
  };

  /**
   *
   * @param {Event} e click event
   */
  const _handleAddToCart = (e) => {
    e.preventDefault();
    post(route("store.cart.add", { product: props.product, qty, temperature }), {
      preserveScroll: true,
    });
  };

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
        <main className="pt-36">
          <div className="md:px-6 lg:px-12 mb-8 flex items-center gap-8 justify-start">
            <Link href="/" className="font-bold flex items-center gap-2">
              <ChevronLeftIcon className="w-6 h-6" /> Seguir Comprando
            </Link>

            <div className="flex items-center gap-1 text-sm">
              <Link href="/">Inicio</Link>
              <span>
                <ChevronRightIcon className="mx-1 h-3 w-3" />
              </span>
              {props.product.breadcrumbs.map((item, index) => {
                return (
                  <span key={index.toString()} className="flex items-center gap-1 text-sm">
                    <Link href={item.url}>{item.name}</Link>
                    <span>
                      <ChevronRightIcon className="mx-1 h-3 w-3" />
                    </span>
                  </span>
                );
              })}
              <span>{props.product.name}</span>
            </div>
          </div>
          <div className="md:flex items-stretch justify-between">
            <div className="md:w-1/2 md:px-6 lg:px-12">
              <div className="md:flex gap-4">
                <div className="md:w-20">
                  <img
                    onClick={(e) => {
                      setCurrentImgUrl(props.product.media.featured.original);
                    }}
                    src={props.product.featured_image_thumbnail_url}
                    alt={props.product.name}
                    className="w-full h-auto rounded mb-2"
                  />
                  {props.product.media.gallery.length > 0 &&
                    props.product.media.gallery.map((item, index) => {
                      return (
                        <img
                          onClick={(e) => {
                            _handleGalleryImgClick(item);
                          }}
                          key={index.toString()}
                          src={item.url}
                          alt={props.product.name}
                          className="w-full h-auto rounded mb-2"
                        />
                      );
                    })}
                </div>
                <div className="md:w-full flex-1">
                  <img src={currentImgUrl} alt={props.product.name} className="w-full h-auto rounded" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:px-6 lg:px-12">
              <div className="w-full md:w-full lg:w-4/5">
                <p className="mb-5">
                  <span className="text-xs text-gray-400 block font-light">{props.product.sku}</span>
                  <span className="text-xs text-gray-400 block font-light">{`${props.product.category_name} / ${props.product.subcategory_name}`}</span>
                </p>

                <h1 className="text-3xl uppercase font-bold">
                  {props.product.name} <span className="text-xl">{props.product.cont_neto}</span>
                </h1>

                <span className="block mb-10 text-2xl text-red-700 font-medium">
                  {numeral(props.product.price).format("$ 0,000.00")} <small className="text-xs font-normal">IVA incluido</small>
                </span>

                <p className="font-bold text-black text-sm mb-2">Descripción del Producto</p>
                <div className="mb-6 text-sm font-thin" dangerouslySetInnerHTML={{ __html: props.product.description }}></div>

                <p className="font-bold text-black text-sm mb-2">Recomendación de Uso: {props.product.icono}</p>
                <div className="mb-6 flex gap-2 items-center">
                  {props.product.icos.length > 0 && props.product.icos.map((item, index) => <img src={`/static/img/${item}`} className="w-10 h-10" key={index.toString()} />)}
                </div>

                <p className="font-bold text-black text-sm mb-2">Seleccionar preferencia de temperatura:</p>
                {props.product.temperature === "AMBOS" && (
                  <div className="mb-6">
                    <ProductTempInput temp="Congelado" currentVal={temperature} onChange={_handleTemperatureChange} />
                    <ProductTempInput temp="Fresco" currentVal={temperature} onChange={_handleTemperatureChange} />
                  </div>
                )}

                {props.product.temperature === "FRESCO" && (
                  <div className="mb-6">
                    <ProductTempInput temp="Fresco" currentVal={temperature} onChange={_handleTemperatureChange} />
                  </div>
                )}

                {props.product.temperature === "CONGELADO" && (
                  <div className="mb-6">
                    <ProductTempInput temp="Congelado" currentVal={temperature} onChange={_handleTemperatureChange} />
                  </div>
                )}

                <div className="border-4 border-gray-200 flex items-center justify-evenly py-2 w-full md:w-1/2 lg:w-1/3 mb-4">
                  <button
                    onClick={(e) => {
                      if (qty > 1) {
                        setQty(qty - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button>{qty.toString()}</button>
                  <button
                    onClick={(e) => {
                      setQty(qty + 1);
                    }}
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* <button onClick={_handleAddToCart} className="rounded bg-yellow-600 text-white font-medium text-center shadow block w-full py-2">
                    Comprar Ahora
                  </button> */}

                  <button onClick={_handleAddToCart} className="rounded bg-white text-yellow-600 border-yellow-600 border font-medium text-center shadow block w-full py-2">
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </StoreLayout>
  );
}
