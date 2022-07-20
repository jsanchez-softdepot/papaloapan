import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Editor } from "@tinymce/tinymce-react";
import ValidationErrors from "@/Components/ValidationErrors";
import toast from "react-hot-toast";

export default function ProductForm({ isEditing = false, editId = null, editModel = null, categories, subcategories }) {
  const [postRoute, setPostRoute] = useState(route("admin.products.store"));
  const [postMethod, setPostMethod] = useState("POST");

  const [featuredImageUrl, setFeaturedImageUrl] = useState("/static/img/placeholder.png");
  const [productGalleryFiles, setProductGalleryFiles] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const [contentUnits, setContentUnits] = useState([
    { id: 1, name: "Kilogramo" },
    { id: 2, name: "Paquete" },
  ]);

  const editorRef = useRef(null);

  const { data, setData, processing, errors, reset, post, patch } = useForm({
    name: "",
    price: "",
    netContent: "",
    contentUnit: "1",
    sku: "",
    description: "",
    categoryId: "0",
    subcategoryId: "",
    galleryFiles: [],
    featuredProduct: false,
    featuredImageFile: "",
    temperature: "No Aplica",
    productGalleryFiles: [],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    _method: "post",
  });

  useEffect(() => {
    if (isEditing) {
      _editMode();
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
  }, [processing]);

  const _editMode = () => {
    setPostRoute(route("admin.products.update", editId));
    setPostMethod("PATCH");

    setData({
      name: editModel.name,
      price: editModel.price,
      netContent: editModel.cont_neto,
      contentUnit: editModel.unit_id,
      sku: editModel.sku,
      description: editModel.description,
      categoryId: editModel.category_id,
      subcategoryId: editModel.subcategory_id,
      galleryFiles: [],
      featuredProduct: editModel.featured,
      featuredImageFile: "",
      temperature: editModel.temperature,
      productGalleryFiles: [],
      seoTitle: editModel.seo.title,
      seoDescription: editModel.seo.description,
      seoKeywords: editModel.seo.keywords,
      _method: "patch",
    });

    setFeaturedImageUrl(editModel.media.featured.medium);

    let newSubcategoriesList = [...subcategories];

    if (parseInt(editModel.category_id) > 0) {
      newSubcategoriesList = newSubcategoriesList.filter((subcat) => parseInt(subcat.category_id) === parseInt(editModel.category_id));
      setFilteredSubcategories(newSubcategoriesList);
    }
  };

  const _onSubmit = (e) => {
    e.preventDefault();

    post(postRoute);
  };

  const _handleInputChange = (e) => {
    e.preventDefault();
    setData(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value);
  };

  const _handleFeaturedImageChange = (e) => {
    setFeaturedImageUrl(URL.createObjectURL(e.target.files[0]));
    setData("featuredImageFile", e.target.files[0]);
  };

  const _handleGalleryImagesChange = (e) => {
    let newGalleryFiles = [...galleryFiles];

    for (let i = 0; i < e.target.files.length; i++) {
      newGalleryFiles.push(e.target.files[i]);
    }

    setGalleryFiles(newGalleryFiles);
    setData("galleryFiles", galleryFiles);
  };

  const _handleGalleryImageDelete = (index) => {
    let newGalleryFiles = [...galleryFiles];

    newGalleryFiles.splice(index, 1);

    setGalleryFiles(newGalleryFiles);
  };

  const _handleProductGalleryDeleteImg = (imgUuid) => {
    console.log(`Delete ${imgUuid}`);
    axios
      .delete(`/api/media/${imgUuid}`)
      .then((rsp) => {
        let newProductGalleryFiles = [...productGalleryFiles];
        let delIndex = newProductGalleryFiles.findIndex((item) => item.uuid === imgUuid);

        console.log(`Delete ${delIndex}`);

        if (delIndex !== undefined) {
          newProductGalleryFiles.splice(delIndex, 1);
        }

        setProductGalleryFiles(newProductGalleryFiles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _changeCategory = (id) => {
    let newSubcategoriesList = [...subcategories];

    if (parseInt(id) > 0) {
      newSubcategoriesList = newSubcategoriesList.filter((subcat) => parseInt(subcat.category_id) === parseInt(id));
      setFilteredSubcategories(newSubcategoriesList);
    }
  };

  const _handleCategoryChange = (e) => {
    var selectedCategoryId = e.target.value;
    setData("categoryId", selectedCategoryId);
    _changeCategory(selectedCategoryId);
  };
  const _handleEditorChange = (newValue, editor) => {
    setData("description", newValue);
  };

  return (
    <React.Fragment>
      <form onSubmit={_onSubmit}>
        <ValidationErrors errors={errors} />

        <div className="panel mb-3">
          <div className="panel-container show">
            <div className="panel-content">
              <div className="row">
                <div className="col-md-5 form-group">
                  <label>Nombre</label>
                  <input name="name" type="text" className="form-control form-control-sm" value={data.name} onChange={_handleInputChange} />
                </div>
                <div className="col-md-3 form-group">
                  <label>Precio</label>
                  <input name="price" type="number" step="0.05" min="0.00" className="form-control form-control-sm" onChange={_handleInputChange} value={data.price} />
                </div>
                <div className="col-md-2 form-group">
                  <label>Destacar</label>
                  <div className="form-group form-check">
                    <input name="featuredProduct" checked={data.featuredProduct} onChange={_handleInputChange} type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="featuredCheck">
                      Sí
                    </label>
                  </div>
                </div>
                <div className="col-md-2 form-group">
                  <label>Temperatura</label>
                  <select name="temperature" className="form-control" value={data.temperature} onChange={_handleInputChange}>
                    <option value="No Aplica">No Aplica</option>
                    <option value="CONGELADO">Congelado</option>
                    <option value="FRESCO">Fresco</option>
                    <option value="AMBOS">Congelado/Fresco</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md form-group">
                  <label>Código Sucursal</label>
                  <input name="sku" type="text" className="form-control form-control-sm" onChange={_handleInputChange} value={data.sku} />
                </div>
                <div className="col-md form-group">
                  <label>Cont. Neto</label>
                  <input name="netContent" type="text" className="form-control form-control-sm" onChange={_handleInputChange} value={data.netContent} />
                </div>
                <div className="col-md form-group">
                  <label>Unidad</label>
                  <select name="contentUnit" className="form-control form-control-sm" onChange={_handleInputChange} value={data.contentUnit}>
                    <option value="1">Kilogramo</option>
                    <option value="2">Paquete</option>
                  </select>
                </div>
                <div className="col-md form-group">
                  <label>Grupo</label>
                  <select name="categoryId" className="form-control form-control-sm" value={data.categoryId} onChange={_handleCategoryChange}>
                    <option value="0">Seleccione grupo</option>
                    {categories.length > 0 &&
                      categories.map((cat) => {
                        return (
                          <option value={cat.id} key={cat.id.toString()}>
                            {cat.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md form-group">
                  <label>Subgrupo</label>
                  <select name="subcategoryId" className="form-control form-control-sm" value={data.subcategoryId} onChange={_handleInputChange}>
                    <option value="0">Seleccione subgrupo</option>
                    {filteredSubcategories.length > 0 &&
                      filteredSubcategories.map((cat) => {
                        return (
                          <option value={cat.id} key={cat.id.toString()}>
                            {cat.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4 form-group">
                  <label>Foto Principal</label>
                  <img src={featuredImageUrl} className="img-fluid" />
                  <hr />
                  <div className="custom-file">
                    <input
                      name="featuredImageUrl"
                      type="file"
                      className="custom-file-input"
                      id="customFileLangHTMLFeatured"
                      onChange={_handleFeaturedImageChange}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                    <label className="custom-file-label" htmlFor="customFileLangHTMLFeatured" data-browse="Examinar">
                      Seleccionar Archivo
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-lg-8 form-group">
                  <div>
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

                  <div className="mt-5">
                    <label>Imágenes Adicionales</label>
                    <div className="row">
                      {productGalleryFiles.length > 0 &&
                        productGalleryFiles.map((img, index) => {
                          return (
                            <div key={index.toString()} className="col-md-4 mb-3 rounded">
                              <img src={img.url} className="mb-1 img-fluid" />
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  _handleProductGalleryDeleteImg(img.uuid);
                                }}
                                className="btn btn-danger btn-sm"
                              >
                                Eliminar
                              </button>
                            </div>
                          );
                        })}
                      {galleryFiles.length > 0 &&
                        galleryFiles.map((img, index) => {
                          return (
                            <div key={index.toString()} className="col-md-4 mb-3 rounded">
                              <img src={URL.createObjectURL(img)} className="mb-1 img-fluid" />
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  _handleGalleryImageDelete(index);
                                }}
                                className="btn btn-danger btn-sm"
                              >
                                Eliminar
                              </button>
                            </div>
                          );
                        })}
                    </div>

                    <hr />
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFileLangHTMLGallery" multiple={true} onChange={_handleGalleryImagesChange} />
                      <label className="custom-file-label" htmlFor="customFileLangHTMLGallery" data-browse="Examinar">
                        Agregar Archivos
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel mb-3">
          <div className="panel-container show">
            <div className="panel-content">
              <div className="mb-3">
                <label>Título</label>
                <input className="form-control" type="text" name="seoTitle" onChange={_handleInputChange} value={data.seoTitle} />
              </div>
              <div className="mb-3">
                <label>Keywords</label>
                <input className="form-control" type="text" name="seoKeywords" onChange={_handleInputChange} value={data.seoKeywords} />
              </div>
              <div className="mb-3">
                <label>Título</label>
                <textarea className="form-control" name="seoDescription" value={data.seoDescription} onChange={_handleInputChange}></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn btn-primary" type="submit" disabled={processing}>
              Publicar Producto
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
