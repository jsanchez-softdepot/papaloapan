import React, { useState } from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { Link } from "@inertiajs/inertia-react";
import numeral from "numeral";

export default function MyAccount(props) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const _editAddress = (id) => {
    console.log(`Edit ID ${id}`);
  };

  return (
    <StoreLayout auth={props.auth} errors={props.errors} categories={props.categories} cart={props.cart} cartTotal={props.cartTotal} cartSubtotal={props.cartSubtotal}>
      <div className="max-w-7xl mx-auto px-5">
        <main className="pt-40">
          <h3 className="md:mx-auto text-gray-800 font-bold text-3xl mb-4">Mi Cuenta</h3>

          <div className="md:flex">
            <div className="md:w-3/5 pr-5">
              <div className="h-16 border-b mb-8">
                <div>
                  <strong>{props.auth.user !== null && props.auth.user.fullname ? props.auth.user.fullname : ""}</strong>
                </div>
                <div>
                  <span>{props.auth.user !== null && props.auth.user.fullname ? props.auth.user.email : ""}</span>
                </div>
              </div>

              <h4 className="text-xl font-bold mb-4">Historial de Pedidos</h4>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-6 text-left"># Pedido</th>
                    <th className="py-6 text-center">Fecha</th>
                    <th className="py-6 text-center">Estatus</th>
                    <th className="py-6 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {props.orders.length > 0 &&
                    props.orders.map((item, index) => {
                      return (
                        <tr key={item.id} className="border-b">
                          <td className="text-left py-8">
                            <Link className="text-yellow-600 underline" href={route("profile.orders.detail", item.id)}>
                              #{item.consecutive}
                            </Link>
                          </td>
                          <td className="text-center py-4">{item.created_at}</td>
                          <td className="text-center py-4">{item.status_text}</td>
                          <td className="text-right py-4">{numeral(item.total).format("$ 0,000.00")} MXN</td>
                        </tr>
                      );
                    })}
                  {props.orders.length < 1 && (
                    <tr>
                      <td className="py-4 text-center text-xl" colSpan={4}>
                        No existen pedidos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="md:w-2/5 pl-12">
              <div className="h-16 border-b mb-8">
                <strong>Mis Direcciones</strong>
              </div>

              {isEditingAddress && editAddressId !== null && (
                <AddressForm
                  addressId={editAddressId}
                  closeForm={() => {
                    setIsEditingAddress(false);
                    setEditAddressId(null);
                  }}
                />
              )}

              {isEditingAddress === false &&
                props.addresses.length > 0 &&
                props.addresses.map((item, index) => {
                  return (
                    <div key={index.toString()} className="py-4 mb-4 border-b">
                      <p className="mb-2 text-xl font-bold">{item.alias}</p>
                      <p className="mb-2">
                        {item.calle} {item.num}
                        <br />
                        {item.colonia_name}, {item.city_name}
                        <br />
                        CP. {item.zipcode}
                      </p>

                      <p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            _editAddress(item.id);
                          }}
                          className="font-bold text-sm text-yellow-600"
                        >
                          Editar
                        </button>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>
    </StoreLayout>
  );
}
