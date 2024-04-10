import { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./service/map-service";
import LoaderMap from "./components/LoaderMap";
import TabNavigation from "./components/TabNavigation";
import List from "./components/List";
import { Tabs } from "./types/types";

function App() {
  const { locations, setLocations, startingPoint } = useLocation();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<Tabs>("form");

  useEffect(() => {
    if (!(startingPoint?.lat === 0 && startingPoint?.lng === 0) && locations.length) {
      setIsLoading(false);
    }

    if (!locations.length) {
      return;
    }

    initMap();

    function initMap() {
      const map = setMap(locations, startingPoint!);
      setMapRef(map);
    }

    window.initMap = initMap;
  }, [locations, startingPoint, setLocations]);

  // TODO: Mostrar para o usuário os endereços que ele já adicionou e permitir que ele remova algum deles
  // TODO: Salvar os endereços que o usuário já adicionou no localStorage para que ele não perca os dados ao recarregar a página
  // TODO: Menu de navegação embaixo do mapa para poder navegar entre os algoritmos de rota
  // TODO: Permitir ao usuário comparar as rotas formadas com o A* e com o Dijkstra com o algoritmo de vizinho mais próximo
  // TODO: Deixar responsivo para todos os tamanhos de tela
  // TODO: Fazer o README.md

  return (
    <main>
      <div className="infos-container">
        {currentTab === "form" && <Form map={mapRef} />}
        {currentTab === "address-list" && <List />}
        <TabNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      <div className="map-container">
        <h1>A* route: (With Dijkstra)</h1>
        <a id="link-map" href="/" target="_blank" rel="noopener noreferrer" />
        <p id="map-dist"></p>
        {isLoading && (
          <div className="d-flex justify-center align-center height-100 flex-direction-column">
            <LoaderMap />
            {startingPoint?.lat === 0 && startingPoint?.lng === 0 ? (
              <p className="loadingText">Waiting for addition of starting point</p>
            ) : (
              <p className="loadingText">Waiting for a point to be added to the route</p>
            )}
          </div>
        )}
        <Map isLoading={isLoading} />
      </div>
    </main>
  );
}

export default App;
