import React from "react";

export default function ImportStep1({ hasHeaders, setHasHeaders, replaceSku, setReplaceSku, handleFileSelected, selectedFile, handleReadFile }) {
  return (
    <React.Fragment>
      <div className="alert alert-primary">
        <ol className="mb-0">
          <li>Configure las opciones en la parte inferior</li>
          <li>Seleccione el archivo XLSX utilizando el botón "SELECCIONAR ARCHIVO" o EXAMINAR</li>
          <li>Haga click en CONTINUAR y espere hasta ser redirigido a la página de productos.</li>
        </ol>
      </div>

      <form>
        <h4>Opciones de Archivo</h4>
        <div className="form-group">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="switchHeaders"
              checked={hasHeaders}
              onChange={(e) => {
                setHasHeaders(e.target.checked);
              }}
            />
            <label className="custom-control-label" htmlFor="switchHeaders">
              El archivo cuenta con cabecera
            </label>
            <p>Si activa esta opción, se ignorará el contenido de la primera fila del archivo.</p>
          </div>
        </div>
        <div className="form-group">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="switchReplace"
              checked={replaceSku}
              onChange={(e) => {
                setReplaceSku(e.target.checked);
              }}
            />
            <label className="custom-control-label" htmlFor="switchReplace">
              Reemplazar usando CÓDIGO SUCURSAL
            </label>
            <p>
              Si activa esta opción, si se encuentra un producto con código de sucursal en la base de datos de la tienda, su información se reemplazará por la del archivo xlsx.
            </p>
          </div>

          <h4>Seleccionar Archivo</h4>
          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFileLangHTML"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileSelected}
              />
              <label className="custom-file-label" htmlFor="customFileLangHTML" data-browse="Examinar">
                {selectedFile === null ? "Seleccionar Archivo" : selectedFile.name}
              </label>
            </div>
          </div>

          <div className="form-group">
            <button onClick={handleReadFile} type="submit" className="btn btn-lg btn-primary">
              CONTINUAR
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
