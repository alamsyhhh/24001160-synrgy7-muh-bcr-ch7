import React from 'react';
import ButtonComponent from '../components/buttonComponent';

interface HeroProps {
  showButton?: boolean;
  buttonLabel?: string;
  buttonNavigateTo?: string;
}

const Hero: React.FC<HeroProps> = ({
  showButton = false,
  buttonLabel = '',
  buttonNavigateTo,
}) => {
  return (
    <section id="hero">
      <div className="row flex-lg-row-reverse align-items-center">
        <div className="deskripsi col-lg-4 order-lg-last">
          <h2 className="display-6 fw-bold lh-2 mb-3">
            Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
          </h2>
          <p className="lead">
            Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
            terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu
            untuk sewa mobil selama 24 jam.
          </p>
          {showButton && (
            <ButtonComponent
              label={buttonLabel}
              navigateTo={buttonNavigateTo}
            />
          )}
        </div>

        <div className="mobil col-lg-7 order-lg-first">
          <div className="row justify-content-end">
            <div className="col-10">
              <img
                src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png"
                className="gambar d-block mx-lg-auto img-fluid"
                alt="Mobil"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
