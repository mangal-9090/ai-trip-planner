import axios from 'axios';

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "CxkwOmzkKfkqEiFgZUyoS4J5I_6JkRHH7Ej83KSsmlQ"; // Replace with your Unsplash Access Key

export const fetchPlacePhotos = async (place) => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: place,
        per_page: 10, // Number of photos to retrieve
        client_id: UNSPLASH_ACCESS_KEY
      }
    });
    //console.log("Fetched photos from Unsplash:", response.data.results); // Log the fetched photos
    return response.data.results;
  } catch (error) {
    console.error("Error fetching photos from Unsplash:", error);
    return [];
  }
};
