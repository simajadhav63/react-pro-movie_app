import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button left" onClick={prevSlide}>
        &#9664;
      </button>
      <img src={images[currentIndex]} alt="Movie" className="carousel-image" />
      <button className="carousel-button right" onClick={nextSlide}>
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
