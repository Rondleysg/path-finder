import { LoaderMapSVG } from "../../assets/svg/LoaderMapSVG";
import "./index.scss";

interface LoaderMapProps {
  hasStartingPoint: boolean;
  isLoadingMap: boolean;
}

const LoaderMap = ({ hasStartingPoint, isLoadingMap }: LoaderMapProps) => {
  return (
    <div className="d-flex justify-center align-center height-100 flex-direction-column">
      <LoaderMapSVG />
      <p className="loadingText">
        {isLoadingMap
          ? "Loading map..."
          : hasStartingPoint
          ? "Waiting for a point to be added to the route"
          : "Waiting for addition of starting point"}
      </p>
    </div>
  );
};

export default LoaderMap;
