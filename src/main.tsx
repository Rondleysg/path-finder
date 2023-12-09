import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { LocationProvider } from "./context/LocationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocationProvider>
    <App />
  </LocationProvider>
);

declare global {
  interface Window {
    initMap: () => void;
  }
}
