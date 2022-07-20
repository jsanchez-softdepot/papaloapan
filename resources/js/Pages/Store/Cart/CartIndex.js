import React, { useState } from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { faAngleLeft, faStore, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from "numeral";
import { Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import ValidationErrors from "@/Components/ValidationErrors";

export default function CartIndex(props) {
  const [cartStep, setCartStep] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [colonias, setColonias] = useState([]);
  const [coloniaName, setColoniaName] = useState("");
  const [cityName, setCityName] = useState("");

  const { post, processing, wasSuccessful, data, setData } = useForm({
    shippingMethod: "",
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    calle: "",
    num: "",
    numInt: "",
    zipcode: "",
    colonia: "0",
    instrucciones: "0",
    alias: "",
    defaultAddress: false,
    selectedAddress: null,
  });

  const _handleSetAddress = (address) => {
    setData({
      shippingMethod: "DELIVERY",
      calle: address.calle,
      num: address.num,
      numInt: address.num_int,
      zipcode: address.zipcode,
      colonia: address.colonia_id,
      instrucciones: address.instrucciones,
      alias: address.alias,
      selectedAddress: address.id,
    });
  };

  const _handleSubmitAddress = (e) => {
    e.preventDefault();

    post(route("store.cart.saveShipping"), {
      preserveScroll: true,
    });
  };

  const _validateZipCode = (code) => {
    axios
      .post(route("zipcode.validate"), { q: code })
      .then((rsp) => {
        setColonias(rsp.data.zipcode.colonias);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _handleColoniaChange = (colId) => {
    let colonia = colonias.find((item) => parseInt(item.id) === parseInt(colId));

    setData("colonia", colonia.id);
    setColoniaName(colonia.city_name);
    setCityName(colonia.name);

    setData("colonia", colId);

    // if (inpCalle.length > 0 && inpNum.length > 0 && inpZipCode.length > 0 && parseInt(colId) > 0) {
    //   setAllowSaveAddress(true);
    // }
  };

  return (
    <StoreLayout
      auth={props.auth}
      errors={props.errors}
      categories={props.categories}
      cart={props.cart}
      cartTotal={props.cartTotal}
      cartSubtotal={props.cartSubtotal}
      showHeader={false}
    >
      <div className="md:flex items-stretch min-h-screen border w-full text-sm">
        <div className="md:w-1/2 lg:w-3/5 bg-white flex-grow min-h-screen px-12 py-8">
          <img src="/static/img/logotipo_papaloapan.png" alt="Papaloapan" style={{ filter: "invert(1)" }} className="mb-10 h-20" />

          <div className="flex gap-2 items-center text-base mb-10">
            <span className={cartStep === 0 ? "text-yellow-600 font-medium" : ""}>Carrito</span>
            <ChevronRightIcon className="w-4 h-4" />
            <span className={cartStep === 1 ? "text-yellow-600 font-medium" : ""}>Envío</span>
            <ChevronRightIcon className="w-4 h-4" />
            <span className={cartStep === 2 ? "text-yellow-600 font-medium" : ""}>Pago</span>
          </div>

          { Object.entries(props.cart).length < 1 && (
            <div className="mb-4">
              <p className="mb-4">No existen productos en tu carrito.</p>

              <Link className="bg-yellow-600 inline-block w-full md:w-1/5 lg:w-1/3 text-center py-2 text-white font-medium rounded" href="/">Continuar comprando.</Link>
            </div>
          ) }

          { Object.entries(props.cart).length > 0 && (
            <React.Fragment>
              <h3 className="font-bold text-xl mb-4">Forma de Envío</h3>
              <form onSubmit={_handleSubmitAddress}>
                <div className="border border-gray-400 mb-10 rounded">
                  <div className="border-b-2 p-4 flex gap-4 items-center">
                    <input
                      type="radio"
                      name="shipping_method"
                      value="DELIVERY"
                      onChange={(e) => {
                        setData("shippingMethod", e.target.value);
                      }}
                    />
                    <FontAwesomeIcon className="w-6 h-6" icon={faTruck} />
                    <span className="block">Envío a domicilio Zona urbana de Boca del Río, Veracruz.</span>
                  </div>
                  <div className="p-4 flex gap-4 items-center">
                    <input
                      type="radio"
                      name="shipping_method"
                      value="PICKUP"
                      onChange={(e) => {
                        setData("shippingMethod", e.target.value);
                      }}
                    />
                    <FontAwesomeIcon className="w-6 h-6" icon={faStore} />
                    <span className="block">Recoger en tienda</span>
                    <span className="block text-gray-500">Horario 8 a 16 horas de lunes a sábado</span>
                  </div>
                </div>

                {data.shippingMethod === "DELIVERY" && (
                  <React.Fragment>
                    <h3 className="font-bold text-xl mb-4">Dirección de envío</h3>
                    <div className="rounded bg-blue-100 py-4 px-6 mb-6">Solamente se envía en zona urbana de Boca del Río, Veracruz.</div>

                    <ValidationErrors errors={props.errors} />

                    {props.userAddresses.length > 0 && (
                      <div className="mt-10 md:grid md:grid-cols-3 md:gap-4 mb-6">
                        {props.userAddresses.map((item, index) => {
                          return (
                            <div
                              key={index.toString()}
                              className={`shadow border rounded p-4 cursor-pointer ${
                                data.selectedAddress !== null && data.selectedAddress === item.id ? `bg-gray-100 border-red-700` : ""
                              }`}
                              onClick={(e) => {
                                //setData("selectedAddress", item.id);
                                _handleSetAddress(item);
                                setShowAddressForm(false);
                              }}
                            >
                              <p className="mb-2 text-xl font-semibold">{item.alias}</p>
                              <p className="text-sm">
                                Entrega: {item.allow_sameday_deliver ? "Mismo Día" : "Día Siguiente"}
                                <br />
                                {item.calle} {item.num}
                                <br />
                                {item.colonia_name}, {item.city_name}
                                <br />
                                CP. {item.zipcode}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {props.auth.user !== null && (
                      <div className="mb-4">
                        {props.userAddresses.length < 1 && <p className="mb-4">No cuenta con direcciones agregadas. Presione el botón AGREGAR para ingresar una nueva dirección.</p>}

                        <button
                          className="shadow border rounded p-4 cursor-pointer flex flex-col items-center justify-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAddressForm(true);
                            setData("selectedAddress", null);
                          }}
                        >
                          <div>
                            <PlusCircleIcon className="w-8 h-8" />
                          </div>
                          <div className="text-bold">Agregar Dirección</div>
                        </button>
                      </div>
                    )}

                    {/* CAMPOS PARA NO LOGGEADOS */}
                    {props.auth.user === null && (
                      <div>
                        <div className="lg:flex gap-4 items-center justify-between lg:mb-4">
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                            placeholder="Nombre de quien recibe"
                            onChange={(e) => {
                              setData("receiverName", e.target.value);
                            }}
                          />
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                            placeholder="Teléfono de contacto"
                            onChange={(e) => {
                              setData("receiverPhone", e.target.value);
                            }}
                          />
                          <input
                            type="email"
                            className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                            placeholder="Correo Electrónico"
                            onChange={(e) => {
                              setData("receiverEmail", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* CAMPOS COMUNES */}
                    {showAddressForm || props.auth.user === null ? (
                      <React.Fragment>
                        <div className="lg:flex gap-4 items-center justify-between lg:mb-4">
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                            placeholder="Calle *"
                            onChange={(e) => {
                              setData("calle", e.target.value);
                            }}
                          />
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm w-full lg:w-34 mb-4 lg:mb-0"
                            placeholder="No. Exterior *"
                            onChange={(e) => {
                              setData("num", e.target.value);
                            }}
                          />
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm w-full lg:w-34 mb-4 lg:mb-0"
                            placeholder="No. Interior"
                            onChange={(e) => {
                              setData("numInt", e.target.value);
                            }}
                          />
                        </div>
                        <div className="lg:flex gap-4 items-center justify-between lg:mb-4">
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                            placeholder="Código Postal *"
                            onChange={(e) => {
                              if (e.target.value.length === 5) {
                                setData("zipcode", e.target.value);
                                _validateZipCode(e.target.value);
                              }
                            }}
                          />
                          <select
                            className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                            onChange={(e) => {
                              _handleColoniaChange(e.target.value);
                            }}
                          >
                            <option value="0">Seleccione Colonia *</option>
                            {colonias.length > 0 &&
                              colonias.map((item, index) => {
                                return (
                                  <option value={item.id} key={index.toString()}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </select>
                          <input type="text" className="border rounded bg-gray-200 px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0" placeholder="Ciudad" readOnly value={cityName} />
                        </div>
                        <div className="lg:mb-4">
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm block w-full mb-4 lg:mb-0"
                            placeholder="Instrucciones de Entrega"
                            onChange={(e) => {
                              setData("instrucciones", e.target.value);
                            }}
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                    {/* CAMPOS PARA LOGGEADOS */}
                    {props.auth.user !== null && showAddressForm && (
                      <div>
                        <div className="lg:mb-4">
                          <input
                            type="text"
                            className="border rounded px-4 py-2 text-sm w-full mb-4 lg:mb-0"
                            placeholder="Alias, ej: Casa, oficina"
                            onChange={(e) => {
                              setData("alias", e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex mb-4 items-center gap-4">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setData("defaultAddress", e.target.checked);
                            }}
                          />
                          Guardar como dirección por defecto.
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )}
                {data.shippingMethod !== "" && (
                  <div>
                    <button type="submit" className="bg-yellow-600 inline-block w-full md:w-1/5 lg:w-1/3 text-center py-2 text-white font-medium rounded">
                      Siguiente
                    </button>
                  </div>
                )}
              </form>
            </React.Fragment>
          )}
        </div>
        <div className="md:w-1/2 lg:w-2/5 bg-yellow-50 flex-grow min-h-screen bg-opacity-50 border-l-2 px-12 py-8 last:border-b-0">
          {props.cart === null || props.cart === undefined || (props.cart.length < 1 && <p className="text-center pt-12">No existen productos en el carrito de compras.</p>)}

          {props.cart !== null &&
            Object.entries(props.cart).map(([itemKey, item]) => {
              return (
                <div className="flex items-center mb-6 pb-6 border-b-2 gap-4 relative" key={itemKey.toString()}>
                  <div className="w-24 relative bg-gray">
                    <img className="h-20 rounded" src={item.attributes.thumbnail} alt="" />
                    <div className="rounded-full flex items-center justify-center h-5 w-5 border border-black bg-white text-sm absolute -top-3 right-3">{item.quantity}</div>
                  </div>

                  <div className="w-3/5 px-6">
                    <strong className="block">{item.name}</strong>
                    <span className="block">{item.attributes.temperature}</span>
                  </div>

                  <div className="w-1/5 text-right">
                    <strong>{numeral(Number(item.price) * Number(item.quantity)).format("$ 0,000.00")}</strong>
                  </div>
                </div>
              );
            })}

          <div className="pb-6 border-b-2 md:flex items-center justify-between">
            <div>
              <strong className="block">Subtotal</strong>
              {data.shippingMethod === "DELIVERY" && <span className="block">Envío</span>}
            </div>

            <div className="text-right">
              <strong className="block">{numeral(props.cartTotal).format("$ 0,000.00")}</strong>
              {data.shippingMethod === "DELIVERY" && (
                <span className="block">{props.cartTotal < 250 ? numeral(props.configs.costo_envio.value).format("$ 0,000.00") : "GRATIS"}</span>
              )}
            </div>
          </div>

          <div className="md:flex items-center justify-between text-lg py-6">
            <div>{data.shippingMethod !== "" && <strong className="text-base">TOTAL</strong>}</div>
            <div>
              {data.shippingMethod === "DELIVERY" && (
                <strong>{numeral(props.cartTotal < 250 ? props.cartTotal + Number(props.configs.costo_envio.value) : props.cartTotal).format("$ 0,000.00")}</strong>
              )}
              {data.shippingMethod === "PICKUP" && <strong>{numeral(props.cartTotal).format("$ 0,000.00")}</strong>}
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
