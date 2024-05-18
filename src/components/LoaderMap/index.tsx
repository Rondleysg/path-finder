import { LoaderMapSVG } from "../../assets/svg/LoaderMapSVG";
import { Location } from "../../types/types";
import "./index.css";

interface LoaderMapProps {
  startingPoint: Location | undefined;
}

const LoaderMap = ({ startingPoint }: LoaderMapProps) => {
  return (
    <div className="d-flex justify-center align-center height-100 flex-direction-column">
      <LoaderMapSVG />
      {startingPoint?.latlng.lat === 0 && startingPoint?.latlng.lng === 0 && startingPoint?.endName === "" ? (
        <p className="loadingText">Waiting for addition of starting point</p>
      ) : (
        <p className="loadingText">Waiting for a point to be added to the route</p>
      )}
    </div>
  );
};

export default LoaderMap;
