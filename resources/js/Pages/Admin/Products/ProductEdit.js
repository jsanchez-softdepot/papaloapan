import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import ProductForm from "./ProductForm";

export default function ProductEdit(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Productos", subtitle: "Crear producto", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" href={route("admin.products.index")}>
            Regresar
          </Link>

          <ProductForm editModel={props.product} isEditing={true} editId={props.product.id} categories={props.categories} subcategories={props.subcategories} />
        </div>
      </div>
    </AdminLayout>
  );
}
