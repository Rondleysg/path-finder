import { DistanceSVG } from "../../assets/svg/DistanceSVG";
import { LaunchSVG } from "../../assets/svg/LaunchSVG";
import { MapSVG } from "../../assets/svg/MapSVG";

interface MapsInfoProps {
  totalDistance: number;
  linkMap: string;
}

const MapsInfo = ({ totalDistance, linkMap }: MapsInfoProps) => {
  return (
    <div className="maps-info">
      <MapSVG width={48} />
      <div className="distanceWrapper">
        <p className="distanceHeading">Route distance</p>
        <div className="distance" id="map-dist">
          <DistanceSVG />
          <p>{totalDistance} m</p>
        </div>
      </div>
      <button className="link-map" id="link-map" onClick={() => window.open(linkMap, "_blank")}>
        <LaunchSVG fontSize={20} />
        Link to Google Maps
      </button>
    </div>
  );
};

export default MapsInfo;
