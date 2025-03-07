import { useLocation } from "../../hooks/useLocation";
import AddressItem from "./AddressItem";
import "./index.scss";

const List = () => {
  const { locations, deleteLocation, startingPoint, deleteStartingPoint } = useLocation();

  const renderAddresses = () => {
    if (locations.length === 0) {
      return <div className="empty-message">There are none added</div>;
    }

    return locations.map((location, index) => {
      return <AddressItem key={index} address={location} deleteAddress={() => deleteLocation(index)} />;
    });
  };

  return (
    <div className="list-container">
      <div className="main-content">
        <h1 className="heading">List of added addresses</h1>
        <div className="header">
          <span>You can delete the added points</span>
        </div>
        <div className="adresses">
          <span className="header-list">Starting point</span>
          <div className="address-container-list">
            {startingPoint?.endName !== "" && startingPoint?.latlng.lng !== 0 ? (
              <AddressItem address={startingPoint} deleteAddress={deleteStartingPoint} />
            ) : (
              <div className="empty-message">There are none added</div>
            )}
          </div>
          <span className="header-list">Stopping points</span>
          <div className="address-container-list">{renderAddresses()}</div>
        </div>
      </div>
    </div>
  );
};

export default List;
