export type LatLngLiteral = { lat: number; lng: number };

export type Location = {
  latlng: LatLngLiteral;
  endName: string;
};

export type LocationDistance = {
  location: Location;
  distance: number;
};

export type EndRoute = {
  locationOrder: Location[];
  totalDistance: number;
};
