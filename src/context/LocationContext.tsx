// /src/contexts/LocationContext.tsx
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Location } from "../types/types";

export interface LocationContextProps {
  locations: Location[];
  startingPoint?: Location;
  addLocation: (location: Location) => void;
  deleteLocation: (index: number) => void;
  addStartingPoint: (location: Location) => void;
  deleteStartingPoint: () => void;
}

export const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [startingPoint, setStartingPoint] = useState<Location>({ latlng: { lat: 0, lng: 0 }, endName: "" });

  const addLocation = (location: Location) => {
    localStorage.setItem("locations", JSON.stringify([...locations, location]));
    setLocations([...locations, location]);
  };

  const deleteLocation = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
    localStorage.setItem("locations", JSON.stringify(newLocations));
  };

  const addStartingPoint = (location: Location) => {
    setStartingPoint(location);
    localStorage.setItem("startingPoint", JSON.stringify(location));
  };

  const deleteStartingPoint = () => {
    setStartingPoint({ latlng: { lat: 0, lng: 0 }, endName: "" });
    localStorage.removeItem("startingPoint");
  };

  useEffect(() => {
    const storedLocations = localStorage.getItem("locations");
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
    }

    const storedStartingPoint = localStorage.getItem("startingPoint");
    if (storedStartingPoint) {
      setStartingPoint(JSON.parse(storedStartingPoint));
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{ locations, addLocation, deleteLocation, startingPoint, addStartingPoint, deleteStartingPoint }}
    >
      {children}
    </LocationContext.Provider>
  );
};
