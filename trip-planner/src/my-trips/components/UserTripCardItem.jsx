import { fetchPlacePhotos } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {

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
        // Log the URL to the console
    }
  };

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl ? photoUrl : "/placeholder.jpg"} className='h-[200px] w-full object-cover rounded-xl' />

        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.Country}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} days trip with {trip?.userSelection.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem