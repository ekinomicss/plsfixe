// utils/googleMapsApi.js

export async function getGoogleMapsData(placeQuery) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const placeId = await getPlaceIdFromQuery(placeQuery);
  console.log("Fetching Place ID for:", placeQuery);
  console.log("Place ID:", placeId);  // Log the Place ID

  if (!placeId) {
    return { rating: null, user_ratings_total: null };
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`
  );
  
  const data = await response.json();
  
  if (data.result) {
    const { rating, user_ratings_total } = data.result;
    return { rating, user_ratings_total };
  } else {
    return { rating: null, user_ratings_total: null };
  }
}

export async function getPlaceIdFromQuery(placeQuery) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeQuery)}&inputtype=textquery&fields=place_id&key=${apiKey}`
  );
  
  const data = await response.json();
  
  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].place_id;
  }

  return null;
}
