export const getAddressFromLatLng = async (lat: number, lng: number) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  
    const response = await fetch(geocodeUrl);
    const data = await response.json();
  
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return "Address not found";
  };