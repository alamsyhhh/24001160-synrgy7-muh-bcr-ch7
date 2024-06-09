import React from 'react';

const OurServicesSection: React.FC = () => {
  return (
    <section id="our-services" className="m-5" data-aos="fade-down">
      <div className="container py-5">
        <div className="row">
          <div className="gambar2 col-lg-6 order-lg-first">
            <img
              src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400257/img_service_s9mwxw.png"
              className="img-fluid"
              alt=""
            />
          </div>

          <div className="deskripsi2 col-lg-6 order-lg-last">
            <h3 className="fw-bold">
              Best Car Rental for any kind of trip in (Lokasimu)!
            </h3>
            <p className="pt-3">
              Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
              lebih murah dibandingkan yang lain, kondisi mobil baru, serta
              kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
              wedding, meeting, dll.
            </p>
            <ul className="list-unstyled">
              <li>
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/Group_53_j2hxjq.png"
                  className="py-2 pe-3"
                  alt=""
                />
                Sewa Mobil Dengan Supir di Bali 12 Jam
              </li>
              <li>
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/Group_53_j2hxjq.png"
                  className="py-2 pe-3"
                  alt=""
                />
                Sewa Mobil Lepas Kunci di Bali 24 Jam
              </li>
              <li>
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/Group_53_j2hxjq.png"
                  className="py-2 pe-3"
                  alt=""
                />
                Sewa Mobil Jangka Panjang Bulanan
              </li>
              <li>
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/Group_53_j2hxjq.png"
                  className="py-2 pe-3"
                  alt=""
                />
                Gratis Antar - Jemput Mobil di Bandara
              </li>
              <li>
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/Group_53_j2hxjq.png"
                  className="py-2 pe-3"
                  alt=""
                />
                Layanan Airport Transfer / Drop In Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
