import { useEffect, useState } from "react";
import "./styles/App.scss";
import Map from "./components/Map";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./services/map-service";
import LoaderMap from "./components/LoaderMap";
import TabNavigation from "./components/TabNavigation";
import List from "./components/List";
import { TabsAll, TabsInfo, TabsMap } from "./types/types";
import hasStartingPoint from "./helpers/hasStartingPoint";
import Form from "./components/Form";
import { predefinedRoutes } from "./configs/constants";

function App() {
  const renderMap = import.meta.env.VITE_RENDER_MAP === "true";
  const { locations, startingPoint, addStartingPoint, addLocation, deleteAllLocations } = useLocation();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [linkMap, setLinkMap] = useState("");
  const [currentTabsInfo, setCurrentTabsInfo] = useState<TabsInfo>("form");
  const [currentTabsMap, setCurrentTabsMap] = useState<TabsMap>("a-star");
  const [currentTabsAll, setCurrentTabsAll] = useState<TabsAll>("form");
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!hasStartingPoint(startingPoint) || !locations.length) {
      setIsLoading(true);
      return;
    }

    if (!renderMap) {
      setIsLoading(true);
      return;
    }

    async function initMap() {
      if (isMobile) {
        if (currentTabsAll === "form" || currentTabsAll === "address-list") {
          return;
        }

        setIsLoading(true);
        const { map, linkMapGoogle, totalDistance } = await setMap(
          locations,
          startingPoint!,
          currentTabsAll === "a-star" ? "a-star" : "nearest-neighbors"
        );

        setMapRef(map);
        setLinkMap(linkMapGoogle);
        setTotalDistance(totalDistance);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const { map, linkMapGoogle, totalDistance } = await setMap(locations, startingPoint!, currentTabsMap);

      setLinkMap(linkMapGoogle);
      setTotalDistance(totalDistance);
      setMapRef(map);
      setIsLoading(false);
    }

    window.initMap = initMap;

    if (document.readyState === "complete") {
      initMap();
    }

    window.addEventListener("load", initMap);
  }, [locations, startingPoint, currentTabsMap, currentTabsAll, isMobile, renderMap]);

  const mapIsHidden = (mapType: TabsMap) => {
    if (isLoading) {
      return true;
    }

    if (isMobile) {
      if (currentTabsAll === "form" || currentTabsAll === "address-list") {
        return true;
      }
      return (currentTabsAll as TabsMap) !== mapType;
    }

    return currentTabsMap !== mapType;
  };

  const loadPredefinedRoute = () => {
    deleteAllLocations();

    predefinedRoutes.locations.forEach((location) => addLocation(location));
    addStartingPoint(predefinedRoutes.startingPoint);
  };

  // TODO: Fazer o README.md

  return (
    <main>
      {isMobile ? (
        <div className="d-flex flex-direction-column">
          <TabNavigation currentTabsAll={currentTabsAll} setCurrentTabsAll={setCurrentTabsAll} />

          {currentTabsAll === "form" && <Form map={mapRef} />}
          {currentTabsAll === "address-list" && <List />}

          {currentTabsAll === "a-star" && <h1>A* (With Dijkstra) route: </h1>}
          {currentTabsAll === "nearest-neighbors" && <h1>Nearest Neighbors route:</h1>}

          <Map
            totalDistance={totalDistance}
            linkMap={linkMap}
            hidden={mapIsHidden("a-star")}
            mapId="map-a-star"
          />
          <Map
            totalDistance={totalDistance}
            linkMap={linkMap}
            hidden={mapIsHidden("nearest-neighbors")}
            mapId="map-nearest-neighbors"
          />
        </div>
      ) : (
        <>
          <div className="infos-container">
            {currentTabsInfo === "form" && <Form map={mapRef} />}
            {currentTabsInfo === "address-list" && <List />}
            <TabNavigation currentTabsInfo={currentTabsInfo} setCurrentTabsInfo={setCurrentTabsInfo} />
          </div>

          <div className="map-container">
            <TabNavigation currentTabsMap={currentTabsMap} setCurrentTabsMap={setCurrentTabsMap} />
            {currentTabsMap === "a-star" ? (
              <h1>A* route: </h1>
            ) : (
              <h1>Nearest Neighbors route:</h1>
            )}

            {isLoading && (
              <LoaderMap
                hasStartingPoint={hasStartingPoint(startingPoint)}
                isLoadingMap={hasStartingPoint(startingPoint) && locations.length > 0}
                onClick={loadPredefinedRoute}
              />
            )}

            <Map
              totalDistance={totalDistance}
              linkMap={linkMap}
              hidden={mapIsHidden("a-star")}
              mapId="map-a-star"
            />
            <Map
              totalDistance={totalDistance}
              linkMap={linkMap}
              hidden={mapIsHidden("nearest-neighbors")}
              mapId="map-nearest-neighbors"
            />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
