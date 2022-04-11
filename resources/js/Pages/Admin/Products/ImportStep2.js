import React from "react";

export default function ImportStep2({ handleSubmit, rowsInFile }) {
  return (
    <React.Fragment>
      <div className="alert alert-primary">Revise la información y presione CONTINUAR</div>
      <table className="table table-striped">
        <tbody>
          {rowsInFile.length > 0 &&
            rowsInFile.map((item, index) => {
              return (
                <tr key={index.toString()}>
                  <td>
                    <label>Grupo</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[0]} />
                  </td>
                  <td>
                    <label>Subgrupo</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[1]} />
                  </td>
                  <td>
                    <label>Cód. Sucursal</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[2]} />
                  </td>
                  <td>
                    <label>Producto</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[3]} />
                  </td>
                  <td>
                    <label>Cont. Neto</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[4]} />
                  </td>
                  <td>
                    <label>Precio</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[8]} />
                  </td>
                  <td>
                    <label>Descripción</label>
                    <input disabled type="text" className="form-control form-control-sm" defaultValue={item[7]} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button onClick={handleSubmit} className="btn btn-block btn-lg btn-primary">
        CONTINUAR
      </button>
    </React.Fragment>
  );
}
