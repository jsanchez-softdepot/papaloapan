import React, { useState } from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { Link } from "@inertiajs/inertia-react";
import numeral from "numeral";
import { ChevronLeftIcon, ChevronRightIcon, CreditCardIcon } from "@heroicons/react/outline";

export default function OrderDetail(props) {
  return (
    <StoreLayout auth={props.auth} errors={props.errors} categories={props.categories} cart={props.cart} cartTotal={props.cartTotal} cartSubtotal={props.cartSubtotal}>
      <div className="max-w-7xl mx-auto px-5">
        <main className="pt-36">
          <div className="mb-8 flex items-center gap-8 justify-start">
            <Link href="/mi-cuenta" className="font-bold flex items-center gap-2">
              <ChevronLeftIcon className="w-6 h-6" /> Regresar
            </Link>

            <div className="flex items-center gap-1 text-sm">
              <Link className="font-lg" href="/">
                Inicio
              </Link>

              <span>
                <ChevronRightIcon className="mx-1 h-3 w-3" />
              </span>

              <Link className="font-lg" href="/mi-cuenta">
                Mi Cuenta
              </Link>
            </div>
          </div>

          <h3 className="md:mx-auto text-gray-800 font-bold text-3xl mb-4">Pedido #{props.order.consecutive}</h3>

          <table className="w-full mb-10">
            <thead>
              <tr className="">
                <th className="pb-4 text-left">Producto</th>
                <th className="pb-4 text-left">SKU</th>
                <th className="pb-4 text-right">Precio</th>
                <th className="pb-4 text-right">Cantidad</th>
                <th className="pb-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {props.order.items !== null &&
                props.order.items.length > 0 &&
                props.order.items.map((item, index) => {
                  return (
                    <tr className="border-t" key={item.id}>
                      <td className="py-4 text-left w-1/2 flex items-center gap-4 font-medium">
                        <img src={item.attributes.thumbnail} alt="Producto" className="w-20 h-20 rounded" />
                        {item.name}
                      </td>
                      <td className="py-4 text-left">{item.sku}</td>
                      <td className="py-4 text-right">{numeral(item.price).format("$ 0,000.00")}</td>
                      <td className="py-4 text-right">{item.quantity}</td>
                      <td className="py-4 text-right">{numeral(item.subtotal).format("$ 0,000.00")}</td>
                    </tr>
                  );
                })}
              <tr className="border-t">
                <td colSpan="3" className="text-right pt-8 pb-2">
                  <strong>Subtotal</strong>
                </td>
                <td colSpan="2" className="text-right pt-8 pb-2">
                  <strong>{numeral(props.order.subtotal).format("$ 0,000.00")} MXN</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="text-right py-2">
                  <span>Envío</span>
                </td>
                <td colSpan="2" className="text-right py-2">
                  {numeral(props.order.shipping_amount).format("$ 0,000.00")} MXN
                </td>
              </tr>
              <tr className="border-b">
                <td colSpan="3" className="text-right pt-2 pb-8">
                  <strong>TOTAL</strong>
                </td>
                <td colSpan="2" className="text-right pt-2 pb-8">
                  <span className="text-xl font-bold">{numeral(props.order.total).format("$ 0,000.00")}</span> MXN
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className="md:mx-auto text-gray-800 font-bold text-xl mb-4">Método de Pago</h4>

          <div className="mb-4">{props.order.payment_method_name}</div>
          {props.order.payment_method_id === 1 &&
            props.order.payments
              .filter((item) => (item.status = 1))
              .map((item) => {
                return (
                  <div className="flex items-center gap-4 mb-4" key={item.id}>
                    <div>
                      <CreditCardIcon className="w-10 h-10 text-blue-400" />
                    </div>
                    <div>{item.processor_api_cardinfo}</div>
                  </div>
                );
              })}
        </main>
      </div>
    </StoreLayout>
  );
}
