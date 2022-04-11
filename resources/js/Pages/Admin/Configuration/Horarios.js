import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import TimePicker from "rc-time-picker";
import moment from "moment";

const now = moment();

export default function Horarios(props) {
  const { post, data, setData, transform } = useForm({
    start: moment(),
    end: moment(),
  });

  const _handleSaveConfig = () => {
    post(route("admin.configuration.delivery.store"));
  };

  transform((data) => ({
    ...data,
    start: data.start.format("HH:mm"),
    end: data.end.format("HH:mm"),
  }));

  useEffect(() => {
    let momentStart = moment();
    let momentEnd = moment();

    if (props.configuration.sdd_start) {
      let startParts = props.configuration.sdd_start.value.split(":");
      momentStart = momentStart.set({ hour: startParts[0], minute: startParts[1] });
      // setData("start", moment().set({ hour: startParts[0], minute: startParts[1] }));
    }

    if (props.configuration.sdd_end) {
      console.log(props.configuration.sdd_end);
      let endParts = props.configuration.sdd_end.value.split(":");
      momentEnd = momentEnd.set({ hour: endParts[0], minute: endParts[1] });
      // setData("end", moment().set({ hour: endParts[0], minute: endParts[1] }));
    }

    setData({
      start: momentStart,
      end: momentEnd,
    });
  }, []);

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Horarios", subtitle: "Entrega mismo día", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col-md">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <label>
                  <label className="d-block">Desde</label>
                  <TimePicker
                    onChange={(e) => {
                      setData("start", e);
                    }}
                    value={data.start}
                    addon={(panel) => (
                      <button
                        className="btn btn-primary btn-sm btn-block"
                        onClick={(e) => {
                          panel.close();
                        }}
                      >
                        Aceptar
                      </button>
                    )}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                <label className="d-block">Hasta</label>
                <TimePicker
                  onChange={(e) => {
                    setData("end", e);
                  }}
                  value={data.end}
                  addon={(panel) => (
                    <button
                      className="btn btn-primary btn-sm btn-block"
                      onClick={(e) => {
                        panel.close();
                      }}
                    >
                      Aceptar
                    </button>
                  )}
                />
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
