import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAbbreviation(fullName: string): string {
  // Step 1: Split the full name into words
  const names: string[] = fullName.split(' ');

  // Step 2: Extract the first letter of each name
  const initials: string[] = names.map(name => name.charAt(0).toUpperCase());

  // Step 3: Limit to just two letters
  const abbreviation: string = initials.slice(0, 2).join('');

  // Step 4: Return the abbreviation
  return abbreviation;
}

export function getWasteImageUrl(wasteType: string): string {
  // Define a mapping of waste types to image URLs
  const wasteImages: { [key: string]: string } = {
      "plastic": "/plastic.svg",
      "steel": "/steel.jpeg",
      "metal": "/metal.svg",
      "glass": "/glass.svg",
      "tyres": "/tyres.jpeg",
      // Add more specific waste types as needed
  };

  // Default image for general waste
  const defaultImage = "/waste.jpg";

  // Normalize the waste type to lowercase
  const normalizedWasteType = wasteType.toLowerCase();

  // Return the corresponding image URL or the default image if not found
  return wasteImages[normalizedWasteType] || defaultImage;
}

export const getAddressFromLatLng = async (lat: number, lng: number) => {
	const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

	const response = await fetch(geocodeUrl);
	const data = await response.json();

	if (data.results && data.results.length > 0) {
		return data.results[0].formatted_address;
	}
	return "Address not found";
};