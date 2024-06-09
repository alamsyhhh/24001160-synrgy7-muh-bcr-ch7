import React from 'react';
import FaqSection from '../section/faqSection';
import Footer from '../section/footerSection';
import GetStartedSection from '../section/getStartedSection';
import HeaderSection from '../section/headerSection';
import Testimonial from '../section/testimonialSection';
import Hero from '../section/heroSection';
import OurServicesSection from '../section/ourServicesSection';
import WhyUsSection from '../section/whyUsSection';
import AOS from 'aos';
import '../index.css';

const LandingPage: React.FC = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);
  return (
    <>
      <HeaderSection />
      <Hero
        showButton={true}
        buttonLabel="Mulai Sewa Mobil"
        buttonNavigateTo="/cars"
      />
      <OurServicesSection />
      <WhyUsSection />
      <Testimonial />
      <GetStartedSection />
      <FaqSection />
      <Footer />
    </>
  );
};

export default LandingPage;
