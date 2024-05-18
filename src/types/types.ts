export type LatLngLiteral = { lat: number; lng: number };

export type Location = {
  latlng: LatLngLiteral;
  endName: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postCode?: string;
  country?: string;
};

export type LocationDistance = {
  location: Location;
  distance: number;
};

export type EndRoute = {
  locationOrder: Location[];
  totalDistance: number;
};

export type TabsInfo = "form" | "address-list";
export type TabsMap = "a-star" | "nearest-neighbors";
