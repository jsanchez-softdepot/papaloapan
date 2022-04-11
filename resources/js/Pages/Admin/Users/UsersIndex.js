import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Usuarios", subtitle: "Listado de Usuarios", icon: "users" }}>
      <div className="row">
        <div className="col-xl-12">
          <Link className="btn btn-primary" href={route("admin.users.create")}>
            Registrar Usuario
          </Link>
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <div className="panel-toolbar">
                <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>
                <button className="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
                <button className="btn btn-panel" data-action="panel-close" data-toggle="tooltip" data-offset="0,10" data-original-title="Close"></button>
              </div>
            </div>
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.users.length > 0 &&
                      props.users.map((item, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.roles.length > 0 && item.roles.map((item, index) => item.name)}</td>
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
