import React, { useEffect } from 'react';
import feather from 'feather-icons';
import formatRupiah from '../utils/formatMoneyUtils';

interface CarCardProps {
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  type: string;
  year: number;
}

const CarCard: React.FC<CarCardProps> = ({
  manufacture,
  model,
  image,
  rentPerDay,
  capacity,
  description,
  transmission,
  type,
  year,
}) => {
  useEffect(() => {
    feather.replace();
  }, []);

  const formattedRentPerDay = formatRupiah(rentPerDay);

  return (
    <div className="col-md mt-5">
      <div className="card">
        <img src={image} className="img-fluid card-img-top" alt={manufacture} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-light">{`${manufacture} ${model} / ${type}`}</h5>
          <p className="lead fw-bold">{`${formattedRentPerDay} / hari`}</p>
          <p className="card-text">{description}</p>
          <div className="card-info d-flex flex-column gap-2">
            <div className="d-flex gap-3 justify-content-start">
              <span>
                <i className="icon" data-feather="users"></i>
              </span>
              <p>{`${capacity} Orang`}</p>
            </div>
            <div className="d-flex gap-3 justify-content-start">
              <span>
                <i className="icon" data-feather="settings"></i>
              </span>
              <p>{transmission}</p>
            </div>
            <div className="d-flex gap-3 justify-content-start">
              <span>
                <i className="icon" data-feather="calendar"></i>
              </span>
              <p>{`Tahun ${year}`}</p>
            </div>
          </div>
          <button className="btn btn-success w-100 mt-auto">Pilih Mobil</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
