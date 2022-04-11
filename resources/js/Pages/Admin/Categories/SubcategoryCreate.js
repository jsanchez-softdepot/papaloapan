import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import CategoryForm from "./CategoryForm";
import SubcategoryForm from "./SubcategoryForm";

export default function SubcategoryCreate(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "SubGrupos", subtitle: "Crear subgrupo", icon: "th-tags" }}>
      <div className="row">
        <div className="col">
          <Link className="btn  btn-outline-primary waves-effect waves-themed" href={route("admin.subcategories.index")}>
            <i className="fal fa-angle-left mr-2"></i>
            Regresar
          </Link>
          <SubcategoryForm categories={props.categories} />
        </div>
      </div>
    </AdminLayout>
  );
}
