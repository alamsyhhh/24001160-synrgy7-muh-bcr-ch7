import React from 'react';
import formatRupiah from '../../utils/formatMoneyUtils';
import formatDateTime from '../../utils/formatDateTimeUtil';

interface CarCardProps {
  car: {
    name: string;
    category: string;
    price: number;
    image: string;
    startRent: string | null;
    finishRent: string | null;
    updatedAt: string | null;
  };
  onDelete: () => void;
  onUpdate: () => void;
}

const CarCardComponent: React.FC<CarCardProps> = ({
  car,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="col-sm-4 mb-3 mt-3 mb-sm-0">
      <div className="card">
        <img src={car.image} className="card-img-top" alt={car.name} />
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
                {car.startRent ? formatDateTime(car.startRent) : '-'} {'-'}{' '}
                {car.finishRent ? formatDateTime(car.finishRent) : '-'}
              </p>
            </div>
            <div className="d-flex gap-3 justify-content-start">
              <span>
                <i className="inp-icon user" data-feather="clock"></i>
              </span>
              <p>{car.updatedAt ? formatDateTime(car.updatedAt) : '-'}</p>
            </div>
          </div>
          <div className="card-buttons">
            <button
              type="button"
              className="cark btn btn-outline-danger"
              onClick={onDelete}
            >
              Delete
            </button>
            <button className="cark btn btn-success" onClick={onUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCardComponent;
