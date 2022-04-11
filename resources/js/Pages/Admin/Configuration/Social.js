import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";

export default function Social(props) {
  const { post, data, setData, transform } = useForm({
    facebook: props.configuration.facebook ? props.configuration.facebook.value : "",
    youtube: props.configuration.youtube ? props.configuration.youtube.value : "",
    instagram: props.configuration.instagram ? props.configuration.instagram.value : "",
    twitter: props.configuration.twitter ? props.configuration.twitter.value : "",
    whatsapp: props.configuration.whatsapp ? props.configuration.whatsapp.value : "",
  });

  const _handleSaveConfig = () => {
    post(route("admin.configuration.social.store"));
  };

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Redes Sociales", subtitle: "URL de perfiles", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col-md">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Facebook</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      value={data.facebook}
                      onChange={(e) => {
                        setData("facebook", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">YouTube</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      value={data.youtube}
                      onChange={(e) => {
                        setData("youtube", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Instagram</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      value={data.instagram}
                      onChange={(e) => {
                        setData("instagram", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Twitter</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      value={data.twitter}
                      onChange={(e) => {
                        setData("twitter", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Whatsapp</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      value={data.whatsapp}
                      onChange={(e) => {
                        setData("whatsapp", e.target.value);
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
