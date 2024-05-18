import DeleteSVG from "../../assets/svg/DeleteSVG";
import { GisLocationPoi } from "../../assets/svg/GisLocationPoi";
import { Location } from "../../types/types";

interface AddressItemProps {
  address: Location | undefined;
  deleteAddress: () => void;
}

const AddressItem = ({ address, deleteAddress }: AddressItemProps) => {
  if (!address) {
    return null;
  }

  const handleDelete = () => {
    deleteAddress();
  };

  return (
    <div className="address-container">
      <GisLocationPoi fontSize={36} />
      <div className="address-content">
        <div className="address-info">
          <p className="address-street">
            {address.streetAddress}
            <span className="postcode"> - {address.postCode}</span>
          </p>
          <p className="address-city">{`${address.city} - ${address.state}, ${address.country}`}</p>
        </div>
        <button className="delete-button" onClick={handleDelete}>
          <DeleteSVG />
        </button>
      </div>
    </div>
  );
};

export default AddressItem;
