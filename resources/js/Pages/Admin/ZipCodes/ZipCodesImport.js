import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";

export default function ZipCodesImport(props) {
  const [showImportForm, setShowImportForm] = useState(false);
  const { post, processing, wasSuccessful, data, setData } = useForm({
    selectedFile: "",
  });

  const _handleSubmit = (e) => {
    e.preventDefault();

    post(route("admin.zipcodes.import"));
  };

  return (
    <AdminLayout
      auth={props.auth}
      errors={props.errors}
      breadcrumbs={props.breadcrumbs}
      header={{ title: "Códigos Postales", subtitle: "Listado de Códigos Postales", icon: "marker-alt" }}
    >
      <ValidationErrors errors={props.errors} />
      <div className="row">
        <div className="col-xl-12">
          <button
            onClick={(e) => {
              setShowImportForm(true);
            }}
            className="btn btn-primary"
          >
            Importar Códigos Postales
          </button>
          <div id="panel-1" className="panel">
            <div className="panel-hdr">
              <div className="panel-toolbar">
                <button className="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>
                <button className="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
                <button className="btn btn-panel" data-action="panel-close" data-toggle="tooltip" data-offset="0,10" data-original-title="Close"></button>
              </div>
            </div>
            <div className="panel-container show">
              {showImportForm && (
                <div className="mb-5 p-5 border-bottom">
                  <form onSubmit={_handleSubmit}>
                    <label>Seleccione el Archivo que Desea Importar</label>
                    <br />
                    <input
                      type="file"
                      name="selectedFile"
                      defaultValue={data.selectedFile}
                      onChange={(e) => {
                        setData("selectedFile", e.target.files[0]);
                      }}
                    />
                    <br />
                    <br />
                    <button className="btn btn-info">IMPORTAR</button>
                  </form>
                </div>
              )}

              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Colonia</th>
                    <th>Código Postal</th>
                    <th>Envío Mismo Día</th>
                  </tr>
                </thead>
                <tbody>
                  {props.colonias.length > 0 &&
                    props.colonias.map((item, index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{item.name}</td>
                          <td>{item.zipcode.code}</td>
                          <td>{parseInt(item.allow_sameday_deliver) === 1 ? "Sí" : "No"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
