interface MapProps {
  isLoading: boolean;
}

const Map = ({ isLoading }: MapProps) => {
  return (
    <div className={`map-box${isLoading ? " invisible" : ""}`}>
      <div id="map"></div>
    </div>
  );
};

export default Map;
