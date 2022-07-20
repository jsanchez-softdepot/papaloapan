import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";

export default function UserEdit(props) {
  const { patch, errors, data, setData, processing } = useForm({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    is_admin: "0",
    password: "",
    password_confirmation: "",
    role: "0",
    send_notifications: "",
  });

  useEffect(() => {
    setData({
      name: props.user.name,
      lastname: props.user.lastname,
      email: props.user.email,
      phone: props.user.phone,
      is_admin: props.user.is_admin,
      password: "",
      password_confirmation: "",
      role: props.user.roles[0].id,
      send_notifications: props.user.send_notifications,
    })
  }, []);


  const _handleSubmit = (e) => {
    e.preventDefault();

    patch(route("admin.users.update", props.user.id), {
      onSuccess: () => {
        toast.success("Datos actualizados correctamente");
      },
    });
  };

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Usuarios", subtitle: "Crear Usuario", icon: "users" }}>
      <div className="row">
        <div className="col">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <form onSubmit={_handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md">
                      <label>Nombre</label>
                      <input value={data.name} onChange={(e) => setData("name", e.target.value)} type="text" className="form-control form-control-sm" required />
                      {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div className="form-group col-md">
                      <label>Apellidos</label>
                      <input value={data.lastname} onChange={(e) => setData("lastname", e.target.value)} type="text" className="form-control form-control-sm" required />
                      {errors.lastname && <div>{errors.lastname}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md">
                      <label>Email</label>
                      <input value={data.email} onChange={(e) => setData("email", e.target.value)} type="text" className="form-control form-control-sm" required />
                      {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div className="form-group col-md">
                      <label>Teléfono</label>
                      <input value={data.phone} onChange={(e) => setData("phone", e.target.value)} type="text" className="form-control form-control-sm" required />
                      {errors.phone && <div>{errors.phone}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md">
                      <label>Contraseña</label>
                      <input type="text" className="form-control form-control-sm" value={data.password} onChange={(e) => setData("password", e.target.value)} />
                      {errors.password && <div>{errors.password}</div>}
                    </div>
                    <div className="form-group col-md">
                      <label>Contraseña</label>
                      <input
                        id="password_confirmation"
                        type="text"
                        className="form-control form-control-sm"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}

                      />
                      {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md">
                      <label>Acceso al Administrador</label>
                      <select className="form-control form-control-sm" value={data.is_admin} onChange={(e) => setData("is_admin", e.target.value)}>
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                      </select>
                    </div>
                    <div className="form-group col-md">
                      <label>Rol</label>
                      <select id="role" className="form-control form-control-sm" value={data.role} onChange={(e) => setData("role", e.target.value)}>
                        <option value="0">Seleccione una opción</option>
                        {props.roles.map((role) => (
                          <option key={role.id.toString()} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      {errors.role && <div>{errors.role}</div>}
                    </div>
                    <div className="form-group col-md">
                      <label>Enviar Notificaciones</label>
                      <select className="form-control form-control-sm" value={data.send_notifications} onChange={(e) => setData("send_notifications", e.target.value)}>
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <button className="btn btn-primary" type="submit">
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
