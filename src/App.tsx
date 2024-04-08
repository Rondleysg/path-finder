import { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./service/map-service";
import LoaderMap from "./components/LoaderMap";

function App() {
  const { locations, setLocations, startingPoint } = useLocation();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  // TODO: Permitir ao usuário comparar as rotas formadas com o A* e com o Dijkstra com o algoritmo de vizinho mais próximo
  // TODO: Fazer o README.md
  // TODO: Fazer um footer com os links para o meu github e linkedin
  // TODO: Menu de navegação embaixo do lado esquerdo para navegar entre formulário e pontos adicionados
  // TODO: Menu de navegação embaixo do mapa para poder navegar entre os algoritmos de rota
  // TODO: Deixar responsivo para todos os tamanhos de tela

  return (
    <main>
      <div className="infos-container">
        <Form map={mapRef} />
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
