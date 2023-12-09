import { useEffect } from "react";
import "./styles/App.css";
import Map from "./components/Map";
import Form from "./components/Form";
import { useLocation } from "./hooks/useLocation";
import { setMap } from "./service/map-service";

function App() {
  const { locations, setLocations, startingPoint, setStartingPoint } = useLocation();

  useEffect(() => {
    if (!startingPoint || !locations.length) {
      return;
    }

    const scriptTags = document.querySelectorAll("script");
    if (scriptTags.length < 5) {
      const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      const body = document.querySelector("body");
      const scriptEl = document.createElement("script");
      const sourceURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&v=weekly`;

      scriptEl.setAttribute("defer", "");
      scriptEl.setAttribute("src", sourceURL);

      body!.appendChild(scriptEl);
    } else {
      initMap();
    }

    function initMap() {
      setMap(locations, startingPoint!);
    }

    window.initMap = initMap;
  }, [locations, startingPoint]);

  useEffect(() => {
    setStartingPoint!({ lat: -11.182451, lng: -38.000898 });

    setLocations([
      { id: 1, latlng: { lat: -11.182451, lng: -38.000898 }, endName: "Ponto D" },
      { id: 2, latlng: { lat: -11.18241, lng: -37.998544 }, endName: "Ponto C" },
      { id: 3, latlng: { lat: -11.184283, lng: -37.996709 }, endName: "Ponto B" },
      { id: 4, latlng: { lat: -11.181022, lng: -38.002959 }, endName: "Ponto E" },
    ]);
  }, [setLocations, setStartingPoint]);

  // const addLocation = (newLocation: Location) => {
  //   setLocations((prevLocations) => [...prevLocations, newLocation]);
  // };

  return (
    <main>
      <div className="infos-container">
        <Form />
      </div>

      <div className="map-container">
        <h1>Trajeto do A*: (Com Dijkstra)</h1>
        <a id="link-map" href="/" target="_blank" rel="noopener noreferrer">
          Link para mapa no google maps
        </a>
        <p id="map-dist"></p>
        <Map />
      </div>
    </main>
  );
}

export default App;
