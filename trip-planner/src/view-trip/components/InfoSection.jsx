import { Button } from '@/components/ui/button'
//import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoMdShare } from "react-icons/io";
import { fetchPlacePhotos } from '@/service/GlobalApi';

const InfoSection = ({trip}) => {

  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip?.userSelection?.location?.Country) {
      const country = trip.userSelection.location.Country;
      getPlacePhotoUrl(country); // Fetch the photo URL for the selected country
    }
  }, [trip]);

  const getPlacePhotoUrl = async (country) => {
    const photos = await fetchPlacePhotos(country);
    if (photos.length > 0) {
      const url = photos[1].urls.regular;  // Extract the first photo's URL
      setPhotoUrl(url);
      console.log("Photo URL:", url);  // Log the URL to the console
    }
  };
  
  return (
    <div>
        <img 
        src={photoUrl ? photoUrl : "/placeholder.jpg"} 
        alt="Selected place" 
        className='h-[340px] w-full object-cover rounded-xl'
      />


        <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.Country}</h2>
            <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Travellers: {trip?.userSelection?.noOfPeople} People</h2>
            </div>
          </div>
          <Button><IoMdShare /></Button>
        </div>
    </div>
  )
}

export default InfoSection