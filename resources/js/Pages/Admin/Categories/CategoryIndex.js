import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function CategoryIndex(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Grupos", subtitle: "Listado de grupos", icon: "th-tags" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" href={route("admin.categories.create")}>
            Crear Grupo
          </Link>
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Grupo</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.categories.length > 0 &&
                      props.categories.map((item, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td>{item.name}</td>
                            <td className="text-center" width={140}>
                              <Link href={route("admin.categories.edit", item.id)} className="mr-2 btn btn-sm btn-info">
                                <i className="fal fa-pencil"></i>
                              </Link>
                              <Link as="button" method="delete" className="btn btn-sm btn-danger" href={route("admin.categories.destroy", item.id)}>
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
