import { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./services/map-service";
import LoaderMap from "./components/LoaderMap";
import TabNavigation from "./components/TabNavigation";
import List from "./components/List";
import { TabsAll, TabsInfo, TabsMap } from "./types/types";
import hasStartingPoint from "./helpers/hasStartingPoint";

function App() {
  const { locations, startingPoint } = useLocation();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [linkMap, setLinkMap] = useState("");
  const [currentTabsInfo, setCurrentTabsInfo] = useState<TabsInfo>("form");
  const [currentTabsMap, setCurrentTabsMap] = useState<TabsMap>("a-star");
  const [currentTabsAll, setCurrentTabsAll] = useState<TabsAll>("form");
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (
      !(
        startingPoint?.latlng.lat === 0 &&
        startingPoint?.latlng.lng === 0 &&
        startingPoint?.endName === ""
      ) &&
      locations.length
    ) {
      setIsLoading(false);
    }

    if (!locations.length) {
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
  }, [locations, startingPoint, currentTabsMap, currentTabsAll, isMobile]);

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

  // TODO: Melhorar lógica de renderizar os dados do mapa (link e distância)
  // TODO: Organizar o CSS
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
              <h1>A* (With Dijkstra) route: </h1>
            ) : (
              <h1>Nearest Neighbors route:</h1>
            )}

            {isLoading && (
              <LoaderMap
                hasStartingPoint={hasStartingPoint(startingPoint)}
                isLoadingMap={hasStartingPoint(startingPoint) && locations.length > 0}
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
