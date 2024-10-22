// src/components/ui/custom/ImageSlider.js
import React from 'react';
import './ImageSlider.css'; // Ensure this CSS is created

const images = [
  '/images/ad1.jpg',
  '/images/ad2.jpg',
  '/images/ad3.jpg',
  '/images/ad4.jpg',
  '/images/ad5.jpg',
  '/images/ad6.jpg',
  '/images/ad7.jpg',
  '/images/ad8.jpg',
  '/images/ad9.jpg',
  '/images/ad10.jpg',
  
];

const ImageSlider = () => {
  return (
    <div className="slider-container">
      <div className="slider-track">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} className="slider-image" />
        ))}
        {/* Duplicate images to create a seamless looping effect */}
        {images.map((image, index) => (
          <img key={index + images.length} src={image} alt={`Slide ${index + 1}`} className="slider-image" />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
