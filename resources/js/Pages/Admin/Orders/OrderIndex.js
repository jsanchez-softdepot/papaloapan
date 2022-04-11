import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import numeral from "numeral";
import React from "react";

export default function OrderIndex(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Pedidos", subtitle: "Listado de pedidos", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Pagado</th>
                      <th>Estatus</th>
                      <th>Creado</th>
                      <th>Confirmado</th>
                      <th>Finalizado</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.orders.data.length > 0 &&
                      props.orders.data.map((item, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td className="align-middle" width={100}>
                              {item.consecutive}
                            </td>
                            <td className="align-middle">{item.client_name}</td>
                            <td className="align-middle">{numeral(item.total).format("$ 0,0.00")}</td>
                            <td className="align-middle text-center" width={140}>
                              <i className={`far ${item.has_valid_payment ? "fal fa-check-circle" : "fal fa-times-circle"}`}></i>
                            </td>
                            <td>
                              <button className={`btn btn-sm btn-${item.status_color}`}>{item.status_text}</button>
                            </td>
                            <td>{item.created_at}</td>
                            <td>{item.confirmed_at}</td>
                            <td>{item.completed_at}</td>
                            <td>
                              <Link className="btn btn-sm mr-2 btn-outline-primary" href={route(`admin.orders.show`, item.id)}>
                                <i className="fal fa-search-plus"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
