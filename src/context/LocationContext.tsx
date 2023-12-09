// /src/contexts/LocationContext.tsx
import React, { createContext, ReactNode, useState } from "react";
import { LatLngLiteral, Location } from "../types/types";

export interface LocationContextProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  startingPoint?: LatLngLiteral;
  setStartingPoint?: React.Dispatch<React.SetStateAction<LatLngLiteral>>;
}

export const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral>({lat: 0, lng: 0});

  return (
    <LocationContext.Provider value={{ locations, setLocations, startingPoint, setStartingPoint }}>
      {children}
    </LocationContext.Provider>
  );
};
