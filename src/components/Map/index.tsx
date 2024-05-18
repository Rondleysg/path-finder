interface MapProps {
  hidden: boolean;
  mapId: string;
}

const Map = ({ hidden, mapId }: MapProps) => {
  return (
    <div className={`map-box${hidden ? " invisible" : ""}`}>
      <div id={mapId} className="map-div"></div>
    </div>
  );
};

export default Map;
