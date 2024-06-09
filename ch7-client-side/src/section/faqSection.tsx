import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AccordionItem from '../components/accordionComponent';

const FaqSection: React.FC = () => {
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accordions =
      accordionRef.current?.querySelectorAll('.accordion-button');

    const handleAccordionClick = function (this: HTMLElement) {
      this.classList.toggle('active');
      const panel = this.nextElementSibling as HTMLElement | null;
      if (panel?.style.maxHeight) {
        panel.style.maxHeight = '';
      } else {
        panel?.style.setProperty('maxHeight', panel.scrollHeight + 'px');
      }
    };

    accordions?.forEach((accordion) => {
      accordion.addEventListener('click', handleAccordionClick);
    });

    return () => {
      accordions?.forEach((accordion) => {
        accordion.removeEventListener('click', handleAccordionClick);
      });
    };
  }, []);

  return (
    <section id="faq" data-aos="fade-up">
      <div className="container">
        <div className="item">
          <h1>Frequently Asked Question</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className="accordion" id="accordionExample" ref={accordionRef}>
          <AccordionItem
            id="1"
            header="Apa saja syarat yang dibutuhkan?"
            body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore reiciendis aperiam fuga assumenda a dolorem! Esse laborum eum maxime impedit quisquam vel itaque aperiam, commodi nihil nesciunt eius, aspernatur eos?"
          />
          <AccordionItem
            id="2"
            header="Berapa hari minimal sewa mobil lepas kunci?"
            body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore reiciendis aperiam fuga assumenda a dolorem! Esse laborum eum maxime impedit quisquam vel itaque aperiam, commodi nihil nesciunt eius, aspernatur eos?"
          />
          <AccordionItem
            id="3"
            header="Berapa hari sebelumnya sabaiknya booking sewa mobil?"
            body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore reiciendis aperiam fuga assumenda a dolorem! Esse laborum eum maxime impedit quisquam vel itaque aperiam, commodi nihil nesciunt eius, aspernatur eos?"
          />
          <AccordionItem
            id="4"
            header="Apakah Ada biaya antar-jemput?"
            body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore reiciendis aperiam fuga assumenda a dolorem! Esse laborum eum maxime impedit quisquam vel itaque aperiam, commodi nihil nesciunt eius, aspernatur eos?"
          />
          <AccordionItem
            id="5"
            header="Bagaimana jika terjadi kecelakaan?"
            body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore reiciendis aperiam fuga assumenda a dolorem! Esse laborum eum maxime impedit quisquam vel itaque aperiam, commodi nihil nesciunt eius, aspernatur eos?"
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
