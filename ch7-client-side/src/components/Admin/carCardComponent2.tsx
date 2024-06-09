import React, { useState } from 'react';
import formatRupiah from '../../utils/formatMoneyUtils';
import formatDateTime from '../../utils/formatDateTimeUtil';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    startRent: string | null;
    finishRent: string | null;
    updatedAt: string | null;
  };
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const CarCardComponent: React.FC<CarCardProps> = ({
  car,
  onDelete,
  onUpdate,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
    onDelete(car.id);
  };

  return (
    <>
      <div className="col-sm-4 mb-3 mt-3 mb-sm-0">
        <div className="card">
          <img
            src={car.image}
            className="img-fluid card-img-top"
            alt={car.name}
          />
          <div className="card-body">
            <h5 className="card-title">
              {car.name} / {car.category}
            </h5>
            <p className="lead fw-bold">{formatRupiah(car.price)} / hari</p>
            <div className="card-info d-flex flex-column gap-2">
              <div className="d-flex gap-3 justify-content-start">
                <span>
                  <i className="inp-icon user" data-feather="key"></i>
                </span>
                <p>
                  {car.startRent ? formatDateTime(car.startRent) : 'startRent'}{' '}
                  {'-'}{' '}
                  {car.finishRent
                    ? formatDateTime(car.finishRent)
                    : 'finishRent'}
                </p>
              </div>
              <div className="d-flex gap-3 justify-content-start">
                <span>
                  <i className="inp-icon user" data-feather="clock"></i>
                </span>
                <p>{car.updatedAt ? formatDateTime(car.updatedAt) : '-'}</p>
              </div>
            </div>
            <div className="card-buttons d-flex justify-content-center gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-outline-danger flex-grow-1"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
              <button
                className="btn btn-success flex-grow-1"
                onClick={onUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src="./img/img-BeepBeep.png"
                  alt=""
                  className="img-fluid mb-4 mx-auto"
                />
                <p>Are you sure you want to delete this car?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCardComponent;
