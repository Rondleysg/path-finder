import { LoaderMapSVG } from "../../assets/svg/LoaderMapSVG";
import "./index.scss";

interface LoaderMapProps {
  hasStartingPoint: boolean;
  isLoadingMap: boolean;
  onClick: () => void;
}

const LoaderMap = ({ hasStartingPoint, isLoadingMap, onClick }: LoaderMapProps) => {
  const isSettingStartingPoint = !hasStartingPoint && !isLoadingMap;

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
      {isSettingStartingPoint && (
        <div className="load-btn-wrapper">
          <p className="loadingText">
            If you prefer, you can load a predefined route by clicking the button below.
          </p>
          <button className="btn-loading" onClick={onClick}>
            <span className="text-btn">Load</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LoaderMap;
