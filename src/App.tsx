import { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./service/map-service";
import LoaderMap from "./components/LoaderMap";
import TabNavigation from "./components/TabNavigation";
import List from "./components/List";
import { TabsInfo, TabsMap } from "./types/types";

function App() {
  const { locations, startingPoint } = useLocation();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTabsInfo, setCurrentTabsInfo] = useState<TabsInfo>("form");
  const [currentTabsMap, setCurrentTabsMap] = useState<TabsMap>("a-star");

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

    initMap();

    async function initMap() {
      const map = await setMap(locations, startingPoint!, currentTabsMap);
      setMapRef(map);
    }

    window.initMap = initMap;
  }, [locations, startingPoint, currentTabsMap]);

  const mapIsHidden = (mapType: TabsMap) => {
    if (isLoading) {
      return true;
    }

    return currentTabsMap !== mapType;
  };

  // TODO: Deixar responsivo para todos os tamanhos de tela e usar a metodologia BEM para organizar o CSS
  // TODO: Fazer o README.md
  // TODO: Melhorar gasto da api do google (usar apenas 1 grafo para ambos os algoritmos, armazenar o grafo em um estado global, armazenar localmente o grafo)

  return (
    <main>
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
        <a id="link-map" href="/" target="_blank" rel="noopener noreferrer" />
        <p id="map-dist"></p>
        {isLoading && <LoaderMap startingPoint={startingPoint} />}
        <Map hidden={mapIsHidden("a-star")} mapId="map-a-star" />
        <Map hidden={mapIsHidden("nearest-neighbors")} mapId="map-nearest-neighbors" />
      </div>
    </main>
  );
}

export default App;
