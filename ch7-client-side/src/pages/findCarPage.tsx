import React from 'react';
import HeaderSection from '../section/headerSection';
import Hero from '../section/heroSection';
import SearchBar from '../section/seacrhSection';
import Footer from '../section/footerSection';
import AOS from 'aos';
import '../index.css';

const FindingCarPage: React.FC = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);
  return (
    <>
      <HeaderSection />
      <Hero showButton={false} />
      <SearchBar />
      <Footer />
    </>
  );
};

export default FindingCarPage;
