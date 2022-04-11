import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import numeral from "numeral";
import React from "react";

export default function ProductIndex(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Productos", subtitle: "Listado de productos", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" href={route("admin.products.create")}>
            Crear Producto
          </Link>
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.products.length > 0 &&
                      props.products.map((item, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td className="align-middle" width={100}>
                              {item.featured_image_url !== null ? <img height={80} src={item.featured_image_url} /> : <img height={80} src="/static/img/placeholder.png" />}
                            </td>
                            <td className="align-middle">{item.name}</td>
                            <td className="align-middle">{numeral(item.price).format("$ 0,0.00")}</td>
                            <td className="align-middle text-center" width={140}>
                              <Link href={route("admin.products.edit", item.id)} className="mr-2 btn btn-sm btn-info">
                                <i className="fal fa-pencil"></i>
                              </Link>
                              <Link as="button" method="delete" className="btn btn-sm btn-danger" href={route("admin.products.destroy", item.id)}>
                                <i className="fal fa-trash"></i>
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
