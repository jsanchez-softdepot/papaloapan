import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import CategoryForm from "./CategoryForm";

export default function CategoryIndex(props) {
  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Grupos", subtitle: "Editar grupo", icon: "th-tags" }}>
      <div className="row">
        <div className="col">
          <Link className="btn  btn-outline-primary waves-effect waves-themed" href={route("admin.categories.index")}>
            <i className="fal fa-angle-left mr-2"></i>
            Regresar
          </Link>
          <CategoryForm isEditing={true} editId={props.category.id} editModel={props.category} />
        </div>
      </div>
    </AdminLayout>
  );
}
