import { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./service/map-service";

function App() {
  const { locations, setLocations, startingPoint } = useLocation();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!startingPoint || !locations.length) {
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
  // TODO: Quando o mapa não estiver carregado, mostrar uma mensagem para o usuário avisando para adicionar os endereços

  return (
    <main>
      <div className="infos-container">
        <Form map={mapRef} />
      </div>

      <div className="map-container">
        <h1>A* route: (With Dijkstra)</h1>
        <a id="link-map" href="/" target="_blank" rel="noopener noreferrer" />
        <p id="map-dist"></p>
        <Map />
      </div>
    </main>
  );
}

export default App;
