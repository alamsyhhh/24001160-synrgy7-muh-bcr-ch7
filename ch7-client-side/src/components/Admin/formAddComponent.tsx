import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCars, { Car } from '../../hooks/useCars';

interface FormAddComponentProps {
  carData?: Car;
}

interface FormState {
  name: string;
  category: string;
  price: string;
  startRent: string;
  finishRent: string;
  image?: File;
}

const FormAddComponent: React.FC<FormAddComponentProps> = ({ carData }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    carData?.image || './img/img-BeepBeep.png'
  );
  const [formState, setFormState] = useState<FormState>({
    name: carData?.name || '',
    category: carData?.category || '',
    price: carData?.price.toString() || '',
    startRent: carData?.startRent?.slice(0, 10) || '',
    finishRent: carData?.finishRent?.slice(0, 10) || '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createCar, updateCar } = useCars();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(fileList[0]);
      setFormState({ ...formState, image: fileList[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('category', formState.category);
    formData.append('price', formState.price);
    if (formState.image) {
      formData.append('image', formState.image);
    }
    formData.append('startRent', formState.startRent);
    formData.append('finishRent', formState.finishRent);

    let result;
    if (carData) {
      result = await updateCar(carData.id, formData);
      if (result) {
        navigate('/cardashboard', {
          state: { message: 'Car updated successfully' },
        });
      }
    } else {
      result = await createCar(formData);
      if (result) {
        navigate('/cardashboard', {
          state: { message: 'Car created successfully' },
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="card custom-card p-4">
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="tb label-column">
                <label htmlFor="name" className="col-form-label">
                  Name <span className="required-asterisk">*</span>
                </label>
              </td>
              <td className="tb">
                <input
                  type="text"
                  id="name"
                  className="form-control table-input"
                  value={formState.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </td>
            </tr>
            <tr>
              <td className="tb label-column">
                <label htmlFor="price" className="col-form-label">
                  Harga <span className="required-asterisk">*</span>
                </label>
              </td>
              <td className="tb">
                <input
                  type="number"
                  id="price"
                  className="form-control table-input"
                  value={formState.price}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </td>
            </tr>
            <tr>
              <td className="tb label-column">
                <label htmlFor="category" className="col-form-label">
                  Category <span className="required-asterisk">*</span>
                </label>
              </td>
              <td className="tb">
                <select
                  id="category"
                  className="form-select table-input"
                  value={formState.category}
                  onChange={handleInputChange}
                  disabled={isLoading}
                >
                  <option disabled value="">
                    Select Category
                  </option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="tb label-column">
                <label htmlFor="image" className="col-form-label">
                  Foto <span className="required-asterisk">*</span>
                </label>
              </td>
              <td className="tb">
                <img
                  src={imageUrl}
                  className="mt-2 mb-2"
                  style={{ maxHeight: '200px', display: 'block' }}
                  alt="Preview"
                />
                <input
                  type="file"
                  id="image"
                  className="form-control table-input"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <small className="file-size-info">File size max 2MB</small>
              </td>
            </tr>
            <tr>
              <td className="tb label-column">
                <label htmlFor="startRent" className="col-form-label">
                  Start Rent
                </label>
              </td>
              <td className="tb">
                <input
                  type="date"
                  id="startRent"
                  className="form-control table-input"
                  value={formState.startRent}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </td>
            </tr>
            <tr>
              <td className="tb label-column">
                <label htmlFor="finishRent" className="col-form-label">
                  Finish Rent
                </label>
              </td>
              <td className="tb">
                <input
                  type="date"
                  id="finishRent"
                  className="form-control table-input"
                  value={formState.finishRent}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </td>
            </tr>
            <tr>
              <td className="tb">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate('/cardashboard')}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </td>
              <td className="tb">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormAddComponent;
