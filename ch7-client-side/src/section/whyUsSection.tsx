import React from 'react';

const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" data-aos="fade-right">
      <div className="container my-5">
        <h2 className="section-title text-center text-md-start text-lg-start heading_why-us fw-bold">
          Why us?
        </h2>
        <p className="text-center text-md-start text-lg-start">
          Mengapa harus pilih Binar Car Rental?
        </p>

        {/* Why us Card */}
        <div className="row mt-5 mb-5">
          <div className="col-md-6 col-lg-3 my-sm-2">
            <div className="card whyus-card">
              <div className="card_img_why-us">
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/icon1_qn31rh.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <h5 className="card-tittle fw-bold">Mobil Lengkap</h5>
                <p className="card-text">
                  Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan
                  terawat
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 my-sm-2">
            <div className="card whyus-card">
              <div className="card_img_why-us">
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/icon2_aqcvwc.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <h5 className="card-tittle fw-bold">Harga Murah</h5>
                <p className="card-text">
                  Harga murah dan bersaing, bisa bandingkan harga kami dengan
                  rental mobil lain
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 my-sm-2">
            <div className="card whyus-card">
              <div className="card_img_why-us">
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/icon3_o5ozi9.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <h5 className="card-tittle fw-bold">Layanan 24 Jam</h5>
                <p className="card-text">
                  Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga
                  tersedia di akhir minggu
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 my-sm-2">
            <div className="card whyus-card">
              <div className="card_img_why-us">
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710554362/icon4_ko33ft.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <h5 className="card-tittle fw-bold">Sopir Profesional</h5>
                <p className="card-text">
                  Sopir yang profesional, berpengalaman, jujur, ramah dan selalu
                  tepat waktu
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Why us Card */}
      </div>
    </section>
  );
};

export default WhyUsSection;
