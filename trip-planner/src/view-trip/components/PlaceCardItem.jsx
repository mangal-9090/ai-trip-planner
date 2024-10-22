import { Button } from '@/components/ui/button'
import { fetchPlacePhotos } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PlaceCardItem = ({place}) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place.name) {
      const Name = place.name;
      getPlacePhotoUrl(Name); // Fetch the photo URL for the selected country
    }
  }, [place]);

  const getPlacePhotoUrl = async (Name) => {
    const photos = await fetchPlacePhotos(Name);
    if (photos.length > 0) {
      const url = photos[0].urls.small;  // Extract the first photo's URL
      setPhotoUrl(url);
      
    }
  };


  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.name} target='_blank'>
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoUrl ? photoUrl : "/placeholder.jpg"} className='w-[130px] h-[130px] rounded-xl object-cover'/>

            <div>
                <h2 className='font-bold text-lg'>{place.name}</h2>
                <p className='text-sm text-gray-500'>{place.details}</p>
                <h2 className='mt-2'>🎫 Ticket Price: {place.ticket_pricing}</h2>
                
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem