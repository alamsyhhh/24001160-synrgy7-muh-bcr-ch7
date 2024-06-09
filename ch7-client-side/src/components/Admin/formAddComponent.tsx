// FormAddComponent.tsx

import React, { useState } from 'react';
import { Car } from '../../hooks/useCars';
import { useNavigate } from 'react-router-dom';
import useCars from '../../hooks/useCars';

interface FormAddComponentProps {
  carData?: Car;
}

// Define the type for the form state
interface FormState {
  name: string;
  category: string;
  price: string;
  startRent: string;
  finishRent: string;
  image?: File; // Add image property here
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
  const { updateCar } = useCars();
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
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('category', formState.category);
    formData.append('price', formState.price);
    if (formState.image) {
      formData.append('image', formState.image);
    }
    formData.append('startRent', formState.startRent);
    formData.append('finishRent', formState.finishRent);

    const result = await updateCar(carData?.id as string, formData);
    if (result) {
      navigate('/cardashboard', {
        state: { message: 'Car updated successfully' },
      });
    }
  };

  return (
    <div className="card custom-card p-4">
      <form onSubmit={handleSubmit}>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="tb label-column">
                <label htmlFor="name" className="col-form-label">
                  Name
                </label>
              </td>
              <td className="tb">
                <input
                  type="text"
                  id="name"
                  className="form-control table-input"
                  value={formState.name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            {/* Add similar code for other form fields */}
            <tr>
              <td className="tb label-column">
                <label htmlFor="image" className="col-form-label">
                  Foto
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
                />
              </td>
            </tr>
            {/* Other form fields */}
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
                />
              </td>
            </tr>
            <tr>
              <td className="tb">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate('/cardashboard')}
                >
                  Cancel
                </button>
              </td>
              <td className="tb">
                <button type="submit" className="btn btn-primary">
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
