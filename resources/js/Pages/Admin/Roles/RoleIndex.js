import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function RoleIndex(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Roles", subtitle: "Listado de roles", icon: "users-cog" }}>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" href={route("admin.roles.create")}>
            Crear Rol
          </Link>

          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Rol</th>
                      <th>Permisos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.roles.map((item, index) => {
                      return (
                        <tr key={index.toString()}>
                          <td width={60}>{item.id}</td>
                          <td width={280}>{item.name}</td>
                          <td>
                            {item.permissions.map((item, index) => {
                              return (
                                <span className="badge badge-info mr-2" key={index.toString()}>
                                  {item.name}
                                </span>
                              );
                            })}
                          </td>
                          <td>
                            {item.name != "superadmin" && item.name != "client" && (
                              <Link as="button" method="delete" className="btn btn-sm btn-danger" href={route("admin.users.destroy", item.id)}>
                                <i className="fal fa-trash"></i>
                              </Link>
                            )}
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
