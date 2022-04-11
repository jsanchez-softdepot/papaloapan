import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ValidationErrors from "@/Components/ValidationErrors";
import toast from "react-hot-toast";

export default function CategoryForm({ isEditing = false, editId = null, editModel = null }) {
  const [postRoute, setPostRoute] = useState();
  const [postMethod, setPostMethod] = useState();
  const [featuredImageUrl, setFeaturedImageUrl] = useState("/static/img/placeholder.png");

  const editorRef = useRef(null);

  const { data, setData, processing, errors, reset, post, wasSuccessful } = useForm({
    name: "",
    description: "",
    excerpt: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    featuredImage: null,
    _method: "POST",
  });

  useEffect(() => {
    if (isEditing) {
      setData({
        name: editModel.name,
        description: editModel.description,
        excerpt: editModel.excerpt,
        seoTitle: editModel.seo.title,
        seoDescription: editModel.seo.description,
        seoKeywords: editModel.seo.keywords,
        //featuredImage: null,
        _method: "PATCH",
      });

      setFeaturedImageUrl(editModel.media.featured.medium);
    }
  }, []);

  useEffect(() => {
    if (processing) {
      toast("Guardando...", {
        position: "top-right",
        className: "success",
        duration: 2500,
      });
    }
    if (!processing && wasSuccessful) {
      toast("Cambios realizados correctamente", {
        position: "top-right",
        className: "success",
        duration: 2500,
      });
    }
  }, [processing, wasSuccessful]);

  const _handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      post(route("admin.categories.update", editId));
    } else {
      post(route("admin.categories.store"));
    }
  };

  const _handleInputChange = (e) => {
    e.preventDefault();
    setData(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value);
  };

  const _handleFileChange = (e) => {
    setFeaturedImageUrl(URL.createObjectURL(e.target.files[0]));
    setData("featuredImage", e.target.files[0]);
  };

  const _handleEditorChange = (newValue, editor) => {
    setData("description", newValue);
  };

  return (
    <React.Fragment>
      <form onSubmit={_handleSubmit}>
        <ValidationErrors errors={errors} />

        <div className="panel mb-3">
          <div className="panel-container show">
            <div className="panel-content">
              <div className="form-group">
                <label>Nombre</label>
                <input name="name" type="text" className="form-control form-control-sm" onChange={_handleInputChange} defaultValue={data.name} />
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4 form-group">
                  <label>Foto Principal</label>
                  <img src={featuredImageUrl} className="img-fluid" />
                  <hr />
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFileLangHTMLFeatured" onChange={_handleFileChange} accept="image/png, image/jpg, image/jpeg" />
                    <label className="custom-file-label" htmlFor="customFileLangHTMLFeatured" data-browse="Examinar">
                      Seleccionar Archivo
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-lg-8 form-group">
                  <label>Descripción</label>
                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={data.description}
                    onEditorChange={_handleEditorChange}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel mb-3">
          <div className="panel-container show">
            <div className="panel-content">
              <div className="form-group">
                <label>Título</label>
                <input name="seoTitle" type="text" className="form-control form-control-sm" defaultValue={data.seoTitle} onChange={_handleInputChange} />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea name="seoDescription" className="form-control form-control.sm" defaultValue={data.seoDescription} onChange={_handleInputChange}></textarea>
              </div>
              <div className="form-group">
                <label>Keywords</label>
                <input name="seoKeywords" type="text" className="form-control form-control-sm" defaultValue={data.seoKeywords} onChange={_handleInputChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn btn-primary" type="submit">
              {isEditing ? `Actualizar` : `Publicar`} Información
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
