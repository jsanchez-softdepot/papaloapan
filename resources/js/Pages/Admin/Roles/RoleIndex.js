import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

export default function RoleIndex(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Roles", subtitle: "Listado de roles", icon: "users-cog" }}>
      <div className="row">
        <div className="col">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Rol</th>
                      <th>Permisos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.roles.map((item, index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td></td>
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
