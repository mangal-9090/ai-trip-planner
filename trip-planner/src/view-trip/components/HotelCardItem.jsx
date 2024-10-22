import { fetchPlacePhotos } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({hotel}) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (hotel?.name) {
      const Name = hotel.name;
      getPlacePhotoUrl(Name); // Fetch the photo URL for the selected country
    }
  }, [hotel]);

  const getPlacePhotoUrl = async (Name) => {
    const photos = await fetchPlacePhotos(Name);
    if (photos.length > 0) {
      const url = photos[4].urls.small;  // Extract the first photo's URL
      setPhotoUrl(url);
      
    }
  };


  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl ? photoUrl : "/placeholder.jpg"} className='rounded-xl h-[180px] w-full object-cover' alt={hotel?.name}  />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel?.name}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
                        <h2 className='text-sm'>💰 {hotel?.price}</h2>
                        <h2 className='text-sm'>⭐ {hotel?.rating} star</h2>
                    </div>
                </div>
    </Link>
  )
}

export default HotelCardItem