import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" data-aos="fade-up">
      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-12 col-md-4 mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
              </li>
              <li className="nav-item mb-2">
                <p>binarcarrental@gmail.com</p>
              </li>
              <li className="nav-item mb-2">
                <p>081-233-334-808</p>
              </li>
            </ul>
          </div>

          <div className="navigation col-6 col-md-2 mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#our-services" className="nav-link p-1">
                  Our Services
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#why-us" className="nav-link p-1">
                  Why Us
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#testimonial" className="nav-link p-1">
                  Testimonial
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#faq" className="nav-link p-1">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-md-1 mb-3">
            <p>Connect with us</p>
            <div className="d-flex flex-column flex-sm-row">
              <ul className="list-unstyled d-flex flex-row m-0 p-0">
                <li className="me-2 py-1">
                  <a href="https://www.facebook.com/binaracademy/">
                    <img
                      src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710472120/icon_facebook_piwh5m.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li className="me-2 py-1">
                  <a href="https://www.instagram.com/academybinar/">
                    <img
                      src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710472120/icon_instagram_d0byq1.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li className="me-2 py-1">
                  <a href="#">
                    <img
                      src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710472120/icon_twitter_fgbe9g.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li className="me-2 py-1">
                  <a href="#">
                    <img
                      src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710472120/icon_mail_uvhffc.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li className="me-1 py-1">
                  <a href="#">
                    <img
                      src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710472120/icon_twitch_a4kcto.svg"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-1 col-md-2 mb-3">
            <p>Copyright Binar 2022</p>
            <div className="d-flex flex-column flex-sm-row">
              <a href="index.html">
                <img
                  src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400256/logo_g0diue.png"
                  alt=""
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
