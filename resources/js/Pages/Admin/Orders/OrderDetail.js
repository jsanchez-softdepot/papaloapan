import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import numeral from "numeral";
import React from "react";
import { format } from "date-fns";

const ConektaPaymentRow = ({ paymentObj }) => {
  return (
    <tr>
      <td>{paymentObj.processor_api_readable_status}</td>
      <td>Tarjeta de Crédito</td>
      <td>{paymentObj.processor_api_created_at !== null ? format(new Date(paymentObj.processor_api_created_at * 1000), "yyyy-mm-dd hh:mm a") : ""}</td>
      <td>{paymentObj.processor_api_authcode}</td>
      <td>{paymentObj.processor_api_cardinfo}</td>
    </tr>
  );
};

const CashPaymentRow = ({ paymentObj }) => {
  return (
    <tr>
      <td>{paymentObj.status_text}</td>
      <td>Contra Entrega</td>
      <td>{paymentObj.created_at}</td>
      <td>NA</td>
      <td>NA</td>
    </tr>
  );
};

export default function OrderDetail(props) {
  return (
    <AdminLayout
      auth={props.auth}
      errors={props.errors}
      breadcrumbs={props.breadcrumbs}
      header={{ title: "Pedido" + props.order.consecutive, subtitle: "Detalle de pedido", icon: "th-list" }}
    >
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow mb-3">
            <div className="card-header">
              <strong>Información de Cliente</strong>
            </div>

            <table className="table table-bordered mb-0">
              <tbody>
                <tr>
                  <th>Nombre</th>
                  <td>{props.order.client_name}</td>
                </tr>
                <tr>
                  <th>Teléfono</th>
                  <td>{props.order.guestmode ? props.order.shipping_address.phone : props.order.client.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{props.order.guestmode ? props.order.shipping_address.email : props.order.client.phone}</td>
                </tr>
                <tr>
                  <th>Forma de Envío</th>
                  <td>{props.order.shipping_method}</td>
                </tr>
                <tr>
                  <th>Método de Pago</th>
                  <td>{props.order.payment_method_name}</td>
                </tr>
                <tr>
                  <th>Estatus SAP</th>
                  <td>{props.order.sap_status_text}</td>
                </tr>
                <tr>
                  <th># Pedido SAP</th>
                  <td>{props.order.sap_order_id} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className=" col-md-8">
          <div className="card shadow mb-3">
            <div className="card-header">
              <strong className="card-title">Productos</strong>
            </div>
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Producto</th>
                  <th>Temperatura</th>
                  <th>Cantidad</th>
                  <th className="text-right">Precio Unitario</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {props.order.items.map((item, index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{item.sku}</td>
                      <td>{item.name}</td>
                      <td>{item.temperatura}</td>
                      <td>{item.quantity}</td>
                      <td className="text-right">{numeral(item.price).format("$ 0,000.00")}</td>
                      <td className="text-right">{numeral(item.subtotal).format("$ 0,000.00")}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td className="text-right" colSpan={5}>
                    Envío
                  </td>
                  <td className="text-right">{numeral(props.order.shipping_amount).format("$ 0,000.00")}</td>
                </tr>

                <tr>
                  <td className="text-right" colSpan={5}>
                    <h3 className="mb-0">TOTAL</h3>
                  </td>
                  <td className="text-right">
                    <h3 className="mb-0">{numeral(props.order.total).format("$ 0,000.00")}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card shadow mb-3">
            <div className="card-header">
              <strong className="card-title">Pagos</strong>
            </div>
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>Estatus</th>
                  <th>Método</th>
                  <th>Fecha</th>
                  <th>Cód. Autorización.</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {props.order.payments.length > 0 &&
                  props.order.payments.map((paymentItem, index) =>
                    Number(paymentItem.payment_method_id) === 1 ? (
                      <ConektaPaymentRow paymentObj={paymentItem} key={index.toString()} />
                    ) : (
                      <CashPaymentRow paymentObj={paymentItem} key={index.toString()} />
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
