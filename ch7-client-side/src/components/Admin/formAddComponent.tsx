import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../../contexts/carsContext';
import { useCarsContext } from '../../hooks/useCars';
import { format, toZonedTime } from 'date-fns-tz';

interface FormAddComponentProps {
  carData?: Car;
}

interface FormState {
  name: string;
  category: string;
  price: string;
  startRentDate: Date | null;
  startRentTime: string;
  finishRentDate: Date | null;
  finishRentTime: string;
  image?: File;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const FormAddComponent: React.FC<FormAddComponentProps> = ({ carData }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    carData?.image || './img/img-BeepBeep.png'
  );
  const [formState, setFormState] = useState<FormState>({
    name: carData?.name || '',
    category: carData?.category || '',
    price: carData?.price.toString() || '',
    startRentDate: carData?.startRent ? new Date(carData.startRent) : null,
    startRentTime: '',
    finishRentDate: carData?.finishRent ? new Date(carData.finishRent) : null,
    finishRentTime: '',
    image: undefined,
    createdAt: carData?.createdAt ? new Date(carData.createdAt) : null,
    updatedAt: carData?.updatedAt ? new Date(carData.updatedAt) : null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createCar, updateCar } = useCarsContext();
  const navigate = useNavigate();
  const timeZone = 'Asia/Jakarta';
  const isUpdatePage = !!carData;

  useEffect(() => {
    if (carData) {
      const timeZone = 'Asia/Jakarta';

      const startRent = carData.startRent
        ? toZonedTime(new Date(carData.startRent), timeZone)
        : null;
      const finishRent = carData.finishRent
        ? toZonedTime(new Date(carData.finishRent), timeZone)
        : null;

      const startRentTime = startRent
        ? format(startRent, 'HH:mm', { timeZone })
        : '';

      const finishRentTime = finishRent
        ? format(finishRent, 'HH:mm', { timeZone })
        : '';

      console.log(carData);
      console.log(carData.createdAt);

      setFormState({
        name: carData.name,
        category: carData.category,
        price: carData.price.toString(),
        startRentDate: startRent,
        startRentTime,
        finishRentDate: finishRent,
        finishRentTime,
        image: undefined,
        createdAt: carData.createdAt ? new Date(carData.createdAt) : null,
        updatedAt: carData.updatedAt ? new Date(carData.updatedAt) : null,
      });
    }
  }, [carData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(fileList[0]);
      setFormState((prevState) => ({
        ...prevState,
        image: fileList[0],
      }));
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

    const startRentDateTime = formState.startRentDate
      ? new Date(
          `${format(formState.startRentDate, 'yyyy-MM-dd')}T${
            formState.startRentTime
          }`
        ).toISOString()
      : '';
    const finishRentDateTime = formState.finishRentDate
      ? new Date(
          `${format(formState.finishRentDate, 'yyyy-MM-dd')}T${
            formState.finishRentTime
          }`
        ).toISOString()
      : '';

    formData.append('startRent', startRentDateTime);
    formData.append('finishRent', finishRentDateTime);

    formData.append('createdAt', formState.createdAt?.toISOString() || ''); // Append createdAt
    formData.append('updatedAt', new Date().toISOString()); // Update updatedAt to current time

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
                  className="form-control table-input-file"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <small className="file-size-info">File size max 2MB</small>
              </td>
            </tr>
            <tr>
              {isUpdatePage && (
                <>
                  <td className="tb label-column">
                    <label htmlFor="startRent" className="col-form-label">
                      Start Rent
                    </label>
                  </td>
                </>
              )}
              <div className="tb row">
                {isUpdatePage && (
                  <>
                    <td className="tb label-column2">
                      <input
                        type="date"
                        id="startRentDate"
                        className="form-control table-input2"
                        value={
                          formState.startRentDate
                            ? format(formState.startRentDate, 'yyyy-MM-dd', {
                                timeZone,
                              })
                            : ''
                        }
                        onChange={(e) => handleInputChange(e)}
                        disabled={isLoading}
                      />
                    </td>
                    <td className="tb label-column2">
                      <input
                        type="time"
                        id="startRentTime"
                        className="form-control table-input2"
                        value={formState.startRentTime || ''}
                        onChange={(e) => handleInputChange(e)}
                        disabled={isLoading}
                      />
                    </td>
                  </>
                )}
              </div>
            </tr>
            <tr>
              {isUpdatePage && (
                <>
                  <td className="tb label-column">
                    <label htmlFor="finishRent" className="col-form-label">
                      Finish Rent
                    </label>
                  </td>
                </>
              )}
              <div className="tb row">
                {isUpdatePage && (
                  <>
                    <td className="tb label-column2">
                      <input
                        type="date"
                        id="finishRentDate"
                        className="form-control table-input2"
                        value={
                          formState.finishRentDate
                            ? format(formState.finishRentDate, 'yyyy-MM-dd', {
                                timeZone,
                              })
                            : ''
                        }
                        onChange={(e) => handleInputChange(e)}
                        disabled={isLoading}
                      />
                    </td>
                    <td className="tb label-column2">
                      <input
                        type="time"
                        id="finishRentTime"
                        className="form-control table-input2"
                        value={formState.finishRentTime || ''}
                        onChange={(e) => handleInputChange(e)}
                        disabled={isLoading}
                      />
                    </td>
                  </>
                )}
              </div>
            </tr>
            <tr>
              {isUpdatePage && (
                <>
                  <td className="tb label-column">
                    <label htmlFor="createdAt" className="col-form-label">
                      Created At
                    </label>
                  </td>
                </>
              )}
              <div className="tb row">
                {isUpdatePage && (
                  <>
                    <td className="tb label-column2">
                      <input
                        type="date"
                        id="createdAtDate"
                        className="form-control table-input2"
                        value={
                          formState.createdAt
                            ? format(formState.createdAt, 'yyyy-MM-dd', {
                                timeZone,
                              })
                            : ''
                        }
                        onChange={(e) => handleInputChange(e)}
                        disabled
                      />
                    </td>
                    <td className="tb label-column2">
                      <input
                        type="time"
                        id="createdAtTime"
                        className="form-control table-input2"
                        value={
                          formState.createdAt
                            ? format(formState.createdAt, 'HH:mm', { timeZone })
                            : ''
                        }
                        onChange={(e) => handleInputChange(e)}
                        disabled
                      />
                    </td>
                  </>
                )}
              </div>
            </tr>

            <tr>
              {isUpdatePage && (
                <>
                  <td className="tb label-column">
                    <label htmlFor="updateddAt" className="col-form-label">
                      Updated At
                    </label>
                  </td>
                </>
              )}
              <div className="tb row">
                {isUpdatePage && (
                  <>
                    <td className="tb label-column2">
                      <input
                        type="date"
                        id="updatedAtDate"
                        className="form-control table-input2"
                        value={
                          formState.updatedAt
                            ? format(formState.updatedAt, 'yyyy-MM-dd', {
                                timeZone,
                              })
                            : ''
                        }
                        onChange={(e) => handleInputChange(e)}
                        disabled
                      />
                    </td>
                    <td className="tb label-column2">
                      <input
                        type="time"
                        id="updatedAtTime"
                        className="form-control table-input2"
                        value={
                          formState.updatedAt
                            ? format(formState.updatedAt, 'HH:mm', { timeZone })
                            : ''
                        }
                        onChange={(e) => handleInputChange(e)}
                        disabled
                      />
                    </td>
                  </>
                )}
              </div>
            </tr>
            <tr className="">
              <td className="tb pt-3">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate('/cardashboard')}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </td>
              <td className="tb pt-3">
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
