import React, { useEffect, useState } from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { faAngleLeft, faCreditCard, faMoneyBillAlt, faStore, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from "numeral";
import { Link, useForm } from "@inertiajs/inertia-react";
import conektaHelper from "../../../conektaHelper";
import axios from "axios";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import ValidationErrors from "@/Components/ValidationErrors";

export default function CartPayment(props) {
  const [cartStep, setCartStep] = useState(1);

  const [cardNum, setCardNum] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("01");
  const [cardExpYear, setCardExpYear] = useState("2021");
  const [cardName, setCardName] = useState("");
  const [isCardValid, setIsCardValid] = useState(false);

  const [isCardNumValid, setIsCardNumValid] = useState(null);
  const [isCardCvcValid, setIsCardCvcValid] = useState(null);
  const [isCardExpDateValid, setIsCardExpDateValid] = useState(null);

  const [privacyCheck, setPrivacyCheck] = useState(false);

  const { post, processing, wasSuccessful, data, setData } = useForm({
    paymentMethod: "PAYMENT_CREDIT_CARD",
    shippingMethod: "",
    conektaToken: "",
    billingStreet: "AV. SIEMPRE VIVA",
    billingNum: "123",
    billingCol: "CENTRO",
    billingCity: "MONTERREY",
    billingState: "NUEVO LEÓN",
    billingZipcode: "64000",
  });

  useEffect(() => {
    if (data.paymentMethod === "PAYMENT_ON_DELIVERY") {
      setIsCardValid(true);
    } else if (data.paymentMethod === "PAYMENT_CREDIT_CARD" && isCardNumValid && isCardCvcValid && isCardExpDateValid && privacyCheck) {
      setIsCardValid(true);
    } else {
      setIsCardValid(false);
    }
  }, [isCardNumValid, isCardCvcValid, isCardExpDateValid, privacyCheck, data.paymentMethod]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.conekta.io/js/latest/conekta.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    console.log("flash");

    if (props.flash.error) {
      toast(props.flash.error);
    }
  }, [props.flash]);

  const _tokenizeAndSubmit = (e) => {
    e.preventDefault();
    if (
      data.paymentMethod === "PAYMENT_CREDIT_CARD" &&
      (data.billingStreet === "" || data.billingNum === "" || data.billingCol === "" || data.billingCity === "" || data.billingState === "" || data.billingZipcode === "")
    ) {
      toast("Por favor, ingrese una dirección válida.");
      return false;
    }

    if (data.paymentMethod === "PAYMENT_ON_DELIVERY") {
      _handleSubmitOrderAndPayment();
    } else {
      if (!isCardValid) {
        toast("La tarjeta ingresada no es válida.");
        return false;
      }

      conektaHelper.initConekta();
      conektaHelper.tokenize(cardNum, cardName, cardExpMonth, cardExpYear, cardCvc, _handleSubmitOrderAndPayment, function (err) {
        console.log(err);
        toast("Ocurrió un error al realizar el pago. Por favor recargue esta página e intente nuévamente. Si el problema persiste, envíe un correo a info@papaloapan.mx");
      });
    }
  };

  const _handleSubmitOrderAndPayment = (paymentToken = null) => {
    Inertia.post(route("store.order.store"), { ...data, conektaToken: paymentToken ? paymentToken.id : "" });
  };

  const _handleBillingAddressChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;

    switch (name) {
      case "street":
        setData("billingStreet", val);
        break;
      case "num":
        setData("billingNum", val);
        break;
      case "zipcode":
        setData("billingZipcode", val);
        break;
      case "col":
        setData("billingCol", val);
        break;
      case "city":
        setData("billingCity", val);
        break;
      case "state":
        setData("billingState", val);
        break;
    }

    // setBillingAddress(newBillingAddress);
  };

  const _handlePaymentMethodChange = (e) => {
    setData("paymentMethod", e.target.value);
  };

  const _handleCardNumBlur = (e) => {
    // console.log(e.target.value);
    setIsCardNumValid(conektaHelper.validateCardNumber(e.target.value));
  };

  const _handleCvcBlur = (e) => {
    if (e.target.value.length > 0) {
      setIsCardCvcValid(conektaHelper.validateCvc(e.target.value));
    }
  };

  const _handleMonthChange = (e) => {
    setCardExpMonth(e.target.value);
    setIsCardExpDateValid(conektaHelper.validateExpirationDate(e.target.value, cardExpYear));
    _updatePaymentData(e);
  };

  const _handleYearChange = (e) => {
    setCardExpYear(e.target.value);
    setIsCardExpDateValid(conektaHelper.validateExpirationDate(cardExpMonth, e.target.value));
    _updatePaymentData(e);
  };

  const _updatePaymentData = (e) => {
    switch (e.target.name) {
      case "cardName":
        setCardName(e.target.value);
        break;
      case "cardNum":
        setCardNum(e.target.value);
        break;
      case "cardCvc":
        setCardCvc(e.target.value);
        break;
      case "cardMonth":
        setCardExpMonth(e.target.value);
        break;
      case "cardYear":
        setCardExpYear(e.target.value);
        break;
    }
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

          <h3 className="font-bold text-xl mb-4">Forma de Envío</h3>

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

          <h3 className="font-bold text-xl mb-2">Forma de Pago</h3>
          <div className="mb-6">Tarjeta de Crédito / Débito</div>

          <ValidationErrors errors={props.errors} />

          <div className="border border-gray-400 mb-10 rounded">
            <div className="border-b-2 p-4 flex gap-4 items-center">
              <input type="radio" name="payment_method" value="PAYMENT_CREDIT_CARD" onChange={_handlePaymentMethodChange} checked={data.paymentMethod === "PAYMENT_CREDIT_CARD"} />
              <FontAwesomeIcon className="w-6 h-6" icon={faCreditCard} />
              <span className="block flex-grow">Tarjeta de Crédito / Débito</span>
            </div>
            <div className="p-4 flex gap-4 items-center">
              <input type="radio" name="payment_method" value="PAYMENT_ON_DELIVERY" onChange={_handlePaymentMethodChange} checked={data.paymentMethod === "PAYMENT_ON_DELIVERY"} />
              <FontAwesomeIcon className="w-6 h-6" icon={faMoneyBillAlt} />
              <span className="block flex-grow">Pago contra entrega</span>
            </div>
          </div>

          {data.paymentMethod === "PAYMENT_CREDIT_CARD" && (
            <div className="mb-6 p-6 rounded border border-gray-400 bg-gray-50 font-sm">
              <div className="mb-4">
                <p className="mb-1">
                  <strong>Información de Tarjeta</strong>
                </p>
                <input
                  placeholder="Número de Tarjeta"
                  type="text"
                  name="cardNum"
                  className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                  defaultValue={cardNum}
                  onBlur={_handleCardNumBlur}
                  onChange={_updatePaymentData}
                />
              </div>

              <p className="mb-1">
                <strong>Nombre del Titular</strong>
              </p>
              <div className="mb-4">
                <input
                  placeholder="Nombre completo como aparece en la tarjeta"
                  type="text"
                  name="cardName"
                  defaultValue={cardName}
                  className="border rounded px-4 py-2 text-sm flex-grow w-full mb-4 lg:mb-0"
                  onChange={_updatePaymentData}
                />
              </div>

              <div className="md:flex gap-2 items-center justify-between mb-1">
                <p className="w-full md:w-1/2">
                  <strong>Vencimiento</strong>
                </p>

                <p className="w-full md:w-1/2">
                  <strong>CSV</strong>
                </p>
              </div>

              <div className="md:flex gap-2 items-center justify-between mb-4">
                <select
                  defaultValue={cardExpMonth}
                  name="cardMonth"
                  className="border rounded px-4 py-2 text-sm flex-grow w-full md:w-1/4 mb-4 lg:mb-0"
                  onChange={_handleMonthChange}
                >
                  <option value="01">Ene</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Abr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Ago</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dic</option>
                </select>
                <select defaultValue={cardExpYear} name="cardYear" className="border rounded px-4 py-2 text-sm flex-grow w-full md:w-1/4 mb-4 lg:mb-0" onChange={_handleYearChange}>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
                <input
                  placeholder="Código de Seguridad"
                  type="text"
                  name="cardCvc"
                  className="border rounded px-4 py-2 text-sm flex-grow w-full md:w-2/4 mb-4 lg:mb-0"
                  defaultValue={cardCvc}
                  onBlur={_handleCvcBlur}
                  onChange={_updatePaymentData}
                />
              </div>

              <hr className="my-4" />

              <strong className="block mb-2">Dirección de Facturación</strong>

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


              <div className="md:grid md:grid-cols-4 md:gap-4 mb-4">
                <input
                  defaultValue={data.billingStreet}
                  name="street"
                  onChange={_handleBillingAddressChange}
                  placeholder="Calle"
                  type="text"
                  className="border rounded px-4 py-2 text-sm col-span-3"
                />

                <input
                  defaultValue={data.billingNum}
                  name="num"
                  onChange={_handleBillingAddressChange}
                  type="text"
                  placeholder="Número"
                  className="border rounded px-4 py-2 text-sm"
                />
              </div>

              <div className="md:grid md:grid-cols-3 md:gap-4 mb-4">
                <input
                  defaultValue={data.billingCol}
                  name="col"
                  onChange={_handleBillingAddressChange}
                  placeholder="Colonia"
                  type="text"
                  className="border rounded px-4 py-2 text-sm"
                />
                <input
                  defaultValue={data.billingCity}
                  name="city"
                  onChange={_handleBillingAddressChange}
                  placeholder="Ciudad"
                  type="text"
                  className="border rounded px-4 py-2 text-sm"
                />
                <input
                  defaultValue={data.billingState}
                  name="state"
                  onChange={_handleBillingAddressChange}
                  placeholder="Estado"
                  type="text"
                  className="border rounded px-4 py-2 text-sm"
                />
              </div>

              <div className="md:grid md:grid-cols-3 md:gap-4 mb-4">
                <input
                  defaultValue={data.billingZipcode}
                  name="zipcode"
                  onChange={_handleBillingAddressChange}
                  placeholder="Código Postal"
                  type="text"
                  className="border rounded px-4 py-2 text-sm"
                />
              </div>

              <div className="mb-4 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={privacyCheck}
                  onChange={(e) => {
                    setPrivacyCheck(e.target.checked);
                  }}
                />
                <strong>He leído y acepto la Política de Privacidad</strong>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`${isCardValid ? `bg-yellow-600` : `bg-gray-200`} inline-block w-full md:w-1/5 lg:w-1/3 text-center py-2 text-white font-medium rounded`}
              disabled={!isCardValid}
              onClick={_tokenizeAndSubmit}
            >
              Realizar Pago
            </button>
          </div>
        </div>
        <div className="md:w-1/2 lg:w-2/5 bg-yellow-50 flex-grow min-h-screen bg-opacity-50 border-l-2 px-12 py-8 last:border-b-0">
          {props.cart === null || props.cart === undefined || (props.cart.length < 1 && <p className="text-center pt-12">No existen productos en el carrito de compras.</p>)}

          {props.cart !== null &&
            Object.entries(props.cart).map(([itemKey, item]) => {
              return (
                <div className="flex items-center mb-6 pb-6 border-b-2 gap-4 relative" key={itemKey.toString()}>
                  <div className="w-1/5 relative bg-gray">
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
              {props.cart.shippingMethod === "DELIVERY" && <span className="block">Envío</span>}
            </div>

            <div className="text-right">
              <strong className="block">{numeral(props.cart.total).format("$ 0,000.00")}</strong>
              {props.cart.shippingMethod === "DELIVERY" && <span className="block">{props.cart.total < 250 ? numeral(shippingAmount).format("$ 0,000.00") : "GRATIS"}</span>}
            </div>
          </div>

          <div className="md:flex items-center justify-between text-lg py-6">
            <div>{props.cart.shippingMethod !== "" && <strong className="text-base">TOTAL</strong>}</div>
            <div>
              {props.cart.shippingMethod === "DELIVERY" && (
                <strong>{numeral(props.cart.total < 250 ? props.cart.total + Number(shippingAmount) : props.cart.total).format("$ 0,000.00")}</strong>
              )}
              {props.cart.shippingMethod === "PICKUP" && <strong>{numeral(props.cart.total).format("$ 0,000.00")}</strong>}
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
