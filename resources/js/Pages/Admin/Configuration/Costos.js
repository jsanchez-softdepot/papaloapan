import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";

export default function Costos(props) {
  const { post, data, setData, transform } = useForm({
    costo_envio: props.configuration.costo_envio ? props.configuration.costo_envio.value : "",
  });

  const _handleSaveConfig = () => {
    post(route("admin.configuration.costos.store"));
  };

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Costos", subtitle: "Envío", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col-md">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Costo de Envío</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      value={data.costo_envio}
                      onChange={(e) => {
                        setData("costo_envio", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          _handleSaveConfig();
        }}
        className="btn btn-info"
        type="submit"
      >
        Guardar Configuración
      </button>
    </AdminLayout>
  );
}
