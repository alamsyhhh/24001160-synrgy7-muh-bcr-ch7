import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const testimonials = [
  {
    imgSrc:
      'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400255/img_photo1_clcavj.png',
    quote: `“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod”`,
    name: 'John Dee 32, Bromo',
  },
  {
    imgSrc:
      'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400255/img_photo1_clcavj.png',
    quote: `“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod”`,
    name: 'John Dee 32, Bromo',
  },
  {
    imgSrc:
      'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400256/img_photo2_s4csws.png',
    quote: `“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod”`,
    name: 'John Dee 32, Bromo',
  },
];

const Testimonial: React.FC = () => {
  const options = {
    center: true,
    items: 2,
    autoplay: true,
    autoplayTimeout: 5000,
    autoWidth: true,
    loop: true,
    margin: 32,
    nav: true,
    // navClass: [['owl-prev ', 'owl-next']],
    navText: [
      '<i class="bi bi-chevron-left owlIcon"></i>',
      '<i class="bi bi-chevron-right owlIcon"/>',
    ],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
      1200: {
        items: 2,
      },
      1400: {
        items: 2,
      },
    },
  };

  return (
    <section id="testimonial" data-aos="fade-left">
      <h1>Testimonial</h1>
      <p>Berbagai review positif dari para pelanggan kami</p>

      <div className="row mt-5">
        <div className="col-12 m-auto">
          <OwlCarousel className="owl-theme" {...options}>
            {testimonials.map((testimonial, index) => (
              <div className="item mb-4" key={index}>
                <img src={testimonial.imgSrc} alt="img" className="img" />
                <div className="testimoni">
                  <div className="ratingContainer">
                    <i className="bi bi-star-fill checked"></i>
                    <i className="bi bi-star-fill checked"></i>
                    <i className="bi bi-star-fill checked"></i>
                    <i className="bi bi-star-fill checked"></i>
                    <i className="bi bi-star-fill checked"></i>
                  </div>
                  <p className="quote">{testimonial.quote}</p>
                  <p className="name">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
