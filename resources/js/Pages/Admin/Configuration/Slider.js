import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import numeral from "numeral";
import React, { useState } from "react";

export default function Slider(props) {
  const [showForm, setShowForm] = useState(false);
  const [slideFileUrl, setSlideFileUrl] = useState("/static/img/placeholder.png");

  const { post, data, setData } = useForm({
    slideText: "",
    slideFile: "",
  });

  const _handleDeleteSlide = (slideId) => {
    console.log("Delete Id");
    post(route("admin.configuration.slider.remove", slideId));
  };

  const _handleSubmit = () => {
    post(route("admin.configuration.slider.store"));

    setShowForm(false);
  };

  const _handleImageChange = (e) => {
    setSlideFileUrl(URL.createObjectURL(e.target.files[0]));
    setData("slideFile", e.target.files[0]);
  };

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Slider", subtitle: "Configuración de Slider", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      {showForm && (
        <React.Fragment>
          <div className="mb-3 row">
            <div className="col-md-8">
              <div className="form-group">
                <label>Texto</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setData("slideText", e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Imagen de Fondo</label>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFileLangHTMLFeatured" onChange={_handleImageChange} accept="image/png, image/jpg, image/jpeg" />
                  <label className="custom-file-label" htmlFor="customFileLangHTMLFeatured" data-browse="Examinar">
                    Seleccionar Archivo
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <img src={slideFileUrl} className="img-fluid" />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
            className="btn btn-outline-danger btn-sm mr-3"
          >
            Cancelar
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              _handleSubmit();
            }}
            className="btn btn-outline-primary btn-sm"
          >
            Guardar
          </button>

          <hr />
        </React.Fragment>
      )}

      <div className="row">
        <div className="col">
          {!showForm && (
            <button
              onClick={(e) => {
                setShowForm(true);
              }}
              className="btn btn-primary"
            >
              Agregar Slide
            </button>
          )}
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Texto</th>
                      <th>Imagen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.slides.map((item, index) => {
                      return (
                        <tr key={index.toString()}>
                          <td className="align-middle">{item.text}</td>
                          <td className="align-middle" width={400}>
                            <img src={item.banner} className="img-fluid" />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                _handleDeleteSlide(item.id);
                              }}
                              className="btn btn-outline-danger btn-sm btn-block"
                            >
                              Eliminar
                            </button>
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
