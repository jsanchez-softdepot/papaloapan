import React from "react";
import { XIcon, XCircleIcon } from "@heroicons/react/outline";
import numeral from "numeral";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const StoreAside = ({ close, products, cartTotal, cartSubtotal }) => {
  const _handleDeleteProduct = (itemId) => {
    Inertia.post(route("store.cart.remove"), { product: itemId }, { preserveScroll: true });
  };

  const _handleQtyUpdate = (itemId, newQty) => {
    Inertia.post(route("store.cart.update"), { product: itemId, quantity: newQty });
  };

  return (
    <div className="min-h-screen bg-white md:w-80 fixed top-0 right-0 bottom-0 z-50 text-sm overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="bg-gray-100 flex items-stretch">
        <div className="bg-gray-200 flex items-center px-2">
          <button
            className="block h-full w-full"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center block py-2 flex-grow">
          <span>CARRITO DE COMPRAS</span>
        </div>
      </div>
      <div className="bg-white flex-grow p-4 flex flex-col justify-between">
        <div className="flex-grow">
          {products.length < 1 && <p className="text-center pt-12">No existen productos en el carrito de compras.</p>}

          {products !== null &&
            Object.entries(products).map(([itemKey, item]) => {
              return (
                <div className="flex mb-4 pb-4 border-b last:border-b-0 gap-4 relative" key={itemKey.toString()}>
                  <button
                    className="absolute top-0 right-0"
                    onClick={(e) => {
                      e.preventDefault();
                      _handleDeleteProduct(item.id);
                    }}
                  >
                    <XCircleIcon className="w-4 h-4" />
                  </button>
                  <div className="w-20 h-20 border rounded object-cover">
                    <img className="rounded" src={item.attributes.thumbnail} alt="" />
                  </div>
                  <div className="flex-grow">
                    <strong className="block">{item.name}</strong>
                    <span className="block mb-1">{item.attributes.temperature}</span>
                    <div className="flex items-end justify-between">
                      <div className="border flex justify-between px-4 items-center rounded py-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            _handleQtyUpdate(item.id, item.quantity - 1);
                          }}
                        >
                          <svg className="fill-current text-gray-600 w-2" viewBox="0 0 448 512">
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>

                        <span className="text-xs mx-4">{item.quantity}</span>

                        <button
                          onClick={(e) => {
                            _handleQtyUpdate(item.id, item.quantity + 1);
                          }}
                        >
                          <svg className="fill-current text-gray-600 w-2" viewBox="0 0 448 512">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-center text-red-700">
                        <strong>{numeral(Number(item.price) * Number(item.quantity)).format("$ 0,000.00")}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-20">
          <hr />
          <div className="flex items-center justify-between my-12">
            <strong>SUBTOTAL</strong>
            <strong>{numeral(cartSubtotal).format("$ 0,000.00")}</strong>
          </div>

          {products !== null && Object.keys(products).length > 0 && (
            <Link href={route("store.cart.index")} className="rounded bg-yellow-600 text-white font-medium text-center shadow block w-full py-3 mb-12">
              Finalizar Compra
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreAside;
