import WasteRequests, { Request } from "./waste-requests";

async function fetchAddresses(requests: Request[]) {
  const updatedRequests = await Promise.all(
    requests.map(async (request) => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${request.lat},${request.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      const address =
        data.results && data.results.length > 0
          ? data.results[0].formatted_address
          : "Address not found";
      return { ...request, address };
    })
  );
  return updatedRequests;
}

const requests = [
    {
      id: 1,
      address: "123 Green St",
      wasteType: "Plastic",
      quantity: 50,
      status: "Pending",
      urgency: "Low",
      lat: 4.789892,
      lng: 3.995342,
    },
    {
      id: 2,
      address: "456 Eco Ave",
      wasteType: "Paper",
      quantity: 30,
      status: "In Progress",
      urgency: "Medium",
      lat: 4.789892,
      lng: 3.995342,
    },
    {
      id: 3,
      address: "789 Recycle Rd",
      wasteType: "Metal",
      quantity: 100,
      status: "Pending",
      urgency: "High",
      lat: 6.789892,
      lng: 4.355342,
    },
    {
      id: 4,
      address: "321 Clean Ln",
      wasteType: "Glass",
      quantity: 40,
      status: "Completed",
      urgency: "Low",
      lat: 6.789892,
      lng: 2.995342,
    },
    {
      id: 5,
      address: "654 Sustain Blvd",
      wasteType: "Organic",
      quantity: 75,
      status: "Pending",
      urgency: "Medium",
      lat: 3.789892,
      lng: 6.295342,
    },
  ];

export default async function WasteRequestsContainer() {
  const updatedRequests = await fetchAddresses(requests);

  return <WasteRequests requests={updatedRequests} />;
}
