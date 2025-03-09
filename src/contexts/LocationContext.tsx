import React, { createContext, ReactNode, useCallback, useEffect, useState, useMemo } from "react";
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
  
  const addLocation = useCallback((location: Location) => {
    setLocations(prevLocations => {
      const updatedLocations = [...prevLocations, location];
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      return updatedLocations;
    });
  }, []);

  const deleteLocation = useCallback((index: number) => {
    setLocations(prevLocations => {
      const newLocations = prevLocations.filter((_, i) => i !== index);
      localStorage.setItem("locations", JSON.stringify(newLocations));
      return newLocations;
    });
  }, []);

  const addStartingPoint = useCallback((location: Location) => {
    setStartingPoint(location);
    localStorage.setItem("startingPoint", JSON.stringify(location));
  }, []);

  const deleteStartingPoint = useCallback(() => {
    setStartingPoint({ latlng: { lat: 0, lng: 0 }, endName: "" });
    localStorage.removeItem("startingPoint");
  }, []);

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

  const contextValue = useMemo(() => ({
    locations,
    addLocation,
    deleteLocation,
    startingPoint,
    addStartingPoint,
    deleteStartingPoint,
  }), [locations, addLocation, deleteLocation, startingPoint, addStartingPoint, deleteStartingPoint]);

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
