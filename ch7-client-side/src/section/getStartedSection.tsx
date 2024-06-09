import React from 'react';
import ButtonComponent from '../components/buttonComponent';

const GetStartedSection: React.FC = () => {
  return (
    <section id="started" data-aos="fade-up">
      <div className="container">
        <div className="card text-center align-items-center border rounded-2 mx-0 accordion py-5 text-white">
          <div className="card-body">
            <h1 className="card-title fw-bold pb-3">
              Sewa Mobil di (Lokasimu) Sekarang
            </h1>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ButtonComponent label="Mulai Sewa Mobil" navigateTo="/cars" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
