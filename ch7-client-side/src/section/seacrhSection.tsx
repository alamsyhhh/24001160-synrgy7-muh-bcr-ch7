import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';
import CarCard from '../components/carCardComponent';
import { filterCars } from '../utils/filterCarsUtils';
import { Car, DriverType } from '../types/carTypes';
import useFetchCars from '../hooks/useFetchCars';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchSection: React.FC = () => {
  const [cars] = useFetchCars();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [passengerCount, setPassengerCount] = useState<string>('');
  const [driverType, setDriverType] = useState<DriverType | ''>('');
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  useEffect(() => {
    feather.replace();
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value);
  };

  const handlePassengerCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassengerCount(event.target.value);
  };

  const handleDriverTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDriverType(event.target.value as DriverType);
  };

  const handleSearch = () => {
    setSearchPerformed(true);
    const filteredResults = filterCars(
      cars,
      date,
      time,
      passengerCount,
      driverType
    );
    console.log('Filtered Results:', filteredResults);
    setFilteredCars(filteredResults);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const formattedHour = i < 10 ? `0${i}` : `${i}`;
    return (
      <option key={formattedHour} value={`${formattedHour}:00`}>
        {formattedHour}:00 WIB
      </option>
    );
  });

  // if (loading) {
  //   return (
  //     <div className="loading-container d-flex justify-content-center align-items-center">
  //       <div className="spinner-border text-primary" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section>
        <div className="container">
          <div className="card" id="searchbar">
            <div className="card-body">
              <div className="container">
                <div className="row gx-3 d-flex align-items-end">
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="Type-Driver" className="text-start">
                        Tipe Driver
                      </label>
                      <select
                        className="form-select"
                        id="Type-Driver"
                        value={driverType}
                        onChange={handleDriverTypeChange}
                      >
                        <option disabled value="">
                          Pilih Tipe Driver
                        </option>
                        <option value={DriverType.WithDriver}>
                          Dengan Sopir
                        </option>
                        <option value={DriverType.WithoutDriver}>
                          Tanpa Sopir (Lepas Kunci)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div className="form-group">
                      <label htmlFor="input-Date" className="text-start">
                        Tanggal
                      </label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="input-Date"
                          placeholder="Input tanggal..."
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="input-Time" className="text-start">
                        Waktu Jemput/Ambil
                      </label>
                      <div className="input-group">
                        <select
                          className="pick form-control"
                          id="input-Time"
                          defaultValue=""
                          onChange={handleTimeChange}
                        >
                          <option disabled value="">
                            Pilih Waktu
                          </option>
                          {timeOptions}
                        </select>
                        <span
                          className="pick-icon input-group-text"
                          id="basic-addon1"
                        >
                          <div className="input-icon">
                            <i
                              className="inp-icon user"
                              data-feather="clock"
                            ></i>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="total-passenger" className="text-start">
                        Jumlah Penumpang (Opsional)
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="pick form-control bi-border-right"
                          placeholder="Jumlah Penumpang"
                          aria-label="Input group example"
                          aria-describedby="basic-addon1"
                          id="total-passenger"
                          onChange={handlePassengerCountChange}
                        />
                        <span
                          className="pick-icon input-group-text"
                          id="basic-addon1"
                        >
                          <div className="input-icon">
                            <i
                              className="inp-icon user"
                              data-feather="users"
                            ></i>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="search col-1">
                    <button
                      className="btn btn-success"
                      id="search-btn"
                      onClick={handleSearch}
                    >
                      <span className="text-sm">Cari Mobil</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="result-card">
        <div className="container">
          {searchPerformed && filteredCars.length === 0 ? (
            <div className="row">
              <div className="col-12">
                <div className="no-cars-found">
                  <p className="text-center">Cars not found</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="row row-cols-1 row-cols-md-3 g-4"
              id="cars-container"
            >
              {filteredCars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchSection;
