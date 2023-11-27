import React, { useState, useEffect } from 'react';
import '../pages/css/LandingPage.css'

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Function to handle automatic sliding
    const autoSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Set up the interval for automatic sliding (change image every 3 seconds)
    const intervalId = setInterval(autoSlide, 3000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className='image_slider'>
      <div className='center'>
        <img src={images[currentIndex]} alt={`slide-${currentIndex}`} />
      </div>
    </div>
  );
};

export default ImageSlider;
