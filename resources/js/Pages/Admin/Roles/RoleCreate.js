import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";

export default function RoleCreate(props) {
  const { post, errors, data, setData, processing } = useForm({
    name: "",
    permissions: [],
  });

  const _handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.roles.store"));
  };

  const _handlePermissionCheckChange = (e) => {
    let prmId = e.target.value;
    let isChecked = e.target.checked;
    let curData = data.permissions;
    let newData = [];

    if (isChecked) {
      newData = [...curData, prmId];
    } else {
      newData = [...curData];
      let ix = newData.indexOf(prmId);
      newData.splice(ix, 1);
    }

    setData("permissions", newData);
  };

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Roles", subtitle: "Crear Rol", icon: "users-cog" }}>
      <div className="row">
        <div className="col">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <div className="form-group col-md">
                  <label>Nombre</label>
                  <input value={data.name} onChange={(e) => setData("name", e.target.value)} type="text" className="form-control form-control-sm" required />
                  {errors.name && <div>{errors.name}</div>}
                </div>

                <div className="form-group col-md">
                  <label>Permisos</label>
                  <div className="row">
                    {props.permissions.length > 0 &&
                      props.permissions.map((item, index) => {
                        return (
                          <div className="col-md-4 col-lg-3" key={index.toString()}>
                            <div className="form-check">
                              <input onChange={_handlePermissionCheckChange} className="form-check-input" type="checkbox" value={item.id} id={`permission${item.id}`} />
                              <label className="form-check-label" htmlFor={`permission${item.id}`}>
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <form onSubmit={_handleSubmit}>
                  <button className="btn btn-primary" type="submit">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
