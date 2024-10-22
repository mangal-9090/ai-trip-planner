import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary?.length > 0 ? (
          trip.tripData.itinerary.map((item, index) => (
            <div className="mt-5" key={index}>
              <h2 className="font-medium text-lg">Day {item.day}</h2>
              <h2 className="font-medium text-sm text-orange-600">
                {item.best_time_to_visit}
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {item.locations?.map((place, placeIndex) => (
                  <div key={placeIndex}>
                    <h2 className="font-medium text-sm text-gray-600">
                      Time Spent {place.time_spent}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
