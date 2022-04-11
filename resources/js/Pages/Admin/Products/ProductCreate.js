import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import ProductForm from "./ProductForm";

export default function ProductCreate(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Productos", subtitle: "Crear producto", icon: "th-list" }}>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" href={route("admin.products.index")}>
            Regresar
          </Link>

          <ProductForm categories={props.categories} subcategories={props.subcategories} />
        </div>
      </div>
    </AdminLayout>
  );
}
