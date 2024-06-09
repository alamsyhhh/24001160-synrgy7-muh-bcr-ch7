import React from 'react';

const FormAddComponent: React.FC = () => {
  return (
    <div className="card custom-card p-4">
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td className="label-column">
              <label htmlFor="inputName" className="col-form-label">
                Name
              </label>
            </td>
            <td>
              <input
                type="text"
                id="inputName"
                className="form-control table-input"
                aria-describedby="nameHelpInline"
              />
            </td>
          </tr>
          <tr>
            <td className="label-column">
              <label htmlFor="inputHarga" className="col-form-label">
                Harga
              </label>
            </td>
            <td>
              <input
                type="number"
                id="inputHarga"
                className="form-control table-input"
                aria-describedby="hargaHelpInline"
              />
            </td>
          </tr>
          <tr>
            <td className="label-column">
              <label htmlFor="inputFoto" className="col-form-label">
                Foto
              </label>
            </td>
            <td>
              <input
                type="file"
                id="inputFoto"
                className="form-control table-input"
                aria-describedby="fotoHelpInline"
              />
            </td>
          </tr>
          <tr>
            <td className="label-column">
              <label htmlFor="inputStarRent" className="col-form-label">
                Star Rent
              </label>
            </td>
            <td>
              <input
                type="date"
                id="inputStarRent"
                className="form-control table-input"
                aria-describedby="starRentHelpInline"
              />
            </td>
          </tr>
          <tr>
            <td className="label-column">
              <label htmlFor="inputFinishRent" className="col-form-label">
                Finish Rent
              </label>
            </td>
            <td>
              <input
                type="date"
                id="inputFinishRent"
                className="form-control table-input"
                aria-describedby="finishRentHelpInline"
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit" className="btn btn-danger">
                Cancel
              </button>
            </td>
            <td>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormAddComponent;
