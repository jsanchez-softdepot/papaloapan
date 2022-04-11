import React from "react";
import { Head } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>
      <div className="row">
        <div className="col-xl-12"></div>
      </div>
    </AdminLayout>
  );
}
