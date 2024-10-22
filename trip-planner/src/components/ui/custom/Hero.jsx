import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Lottie from 'lottie-react';
import planeAnimation from '../../../assets/plane.json'; // Path to your Lottie animation JSON file
import globeAnimation from '../../../assets/globe.json';

const Hero = () => {
  return (
    <div className='relative flex flex-col items-center mx-56 gap-9'>
      {/* Lottie animation for plane (left of the heading) */}
      <div className='absolute left-[-50px] top-10 w-32 h-32'>
        <Lottie animationData={planeAnimation} loop={true} />
      </div>

      <h1 className='text-center mt-16 font-serif font-bold relative'>
        <span className='text-[#f56551]'>
          Discover your next adventure with AI:
        </span>{' '}
        Personalized Itineraries at your fingertips
      </h1>

      {/* Lottie animation for globe (below the heading) */}
      <div className='absolute right-[-60px] top-40 w-28 h-28'>
        <Lottie animationData={globeAnimation} loop={true} />
      </div>

      <p className='text-xl text-gray-600 text-center font-sans font-medium relative'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
      </p>

      <ImageSlider />
      <Link to={'/create-trip'}>
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
