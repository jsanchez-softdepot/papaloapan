import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import readXlsxFile from "read-excel-file";
import React, { useState } from "react";
import ImportStep1 from "./ImportStep1";
import ImportStep2 from "./ImportStep2";
import toast from "react-hot-toast";
import { useForm } from "@inertiajs/inertia-react";

export default function ImportProducts(props) {
  const [importStep, setImportStep] = useState(1);
  const [hasHeaders, setHasHeaders] = useState(false);
  const [replaceSku, setReplaceSku] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rowsInFile, setRowsInFile] = useState([]);

  const { post, data, setData } = useForm({
    products: [],
  });

  const _handleFileSelected = (e) => {
    if (e.target.files.length > 0) {
      let selFile = e.target.files[0];

      setSelectedFile(selFile);
    }
  };

  const _handleReadFile = (e) => {
    // console.log("Reading File");
    // console.log(hasHeaders);
    // console.log(replaceSku);
    e.preventDefault();

    if (selectedFile === null) {
      toast("Por favor, ingrese un archivo para importar");
      return;
    }

    readXlsxFile(selectedFile)
      .then((rows) => {
        if (hasHeaders) {
          console.log("Has Headers");
          rows.splice(0, 1);
        }

        setRowsInFile(rows);
        setData("products", rows);
        setImportStep(2);
      })
      .catch((e) => {
        toast("Ocurrió un error al leer el archivo.");
      });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    post(route("admin.products.postImport"));
  };

  return (
    <AdminLayout auth={props.auth} errors={props.errors} breadcrumbs={props.breadcrumbs} header={{ title: "Productos", subtitle: "Importar productos", icon: "th-list" }}>
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="row">
        <div className="col">
          <div className="panel">
            <div className="panel-container show">
              <div className="panel-content">
                {importStep === 1 && (
                  <ImportStep1
                    hasHeaders={hasHeaders}
                    setHasHeaders={setHasHeaders}
                    replaceSku={replaceSku}
                    setReplaceSku={setReplaceSku}
                    handleFileSelected={_handleFileSelected}
                    selectedFile={selectedFile}
                    handleReadFile={_handleReadFile}
                  />
                )}

                {importStep === 2 && <ImportStep2 handleSubmit={_handleSubmit} rowsInFile={rowsInFile} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
