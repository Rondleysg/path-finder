import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { LocationProvider } from "./contexts/LocationContext.tsx";
import Footer from "./components/Footer/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocationProvider>
    <App />
    <Footer />
  </LocationProvider>
);

declare global {
  interface Window {
    initMap: () => void;
  }
}
