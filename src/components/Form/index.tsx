import { useEffect, useState } from "react";
import { useLocation } from "../../hooks/useLocation";
import "./index.css";
import { Location } from "../../types/types";
import { getAddressFromLatLng, getLatLngFromAddress } from "../../service/map-service";

interface FormProps {
  map: google.maps.Map | null;
}

const Form = ({ map }: FormProps) => {
  const { locations, setLocations, startingPoint, setStartingPoint } = useLocation();
  const [settingStartingPoint, setSettingStartingPoint] = useState<boolean>(true);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");

  const addLocation = (newLocation: Location) => {
    setLocations((prevLocations) => [...prevLocations, newLocation]);
  };

  useEffect(() => {
    if (startingPoint?.lat === 0 && startingPoint?.lng === 0) {
      setSettingStartingPoint(true);
    } else {
      setSettingStartingPoint(false);
    }

    if (map) {
      map.addListener("click", async function (event: google.maps.MapMouseEvent) {
        if (event.latLng) {
          const address = await getAddressFromLatLng({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });

          if (typeof address === "string") {
            setErrorMessage(address);
            return;
          }

          setStreetAddress(
            `${address.address_components[1].long_name}, ${address.address_components[0].long_name}`
          );
          setCity(address.address_components[2].long_name);
          setState(address.address_components[4].long_name);
          setCountry(address.address_components[5].long_name);
          setPostCode(address.address_components[6].long_name);
          setErrorMessage("");
          setSuccessMessage("Address loaded by click on the map");
        }
      });
    }
  }, [startingPoint, map]);

  const clearForm = () => {
    setErrorMessage("");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullAddress = `${streetAddress}, ${city}, ${state}, ${postCode}, ${country}`;
    const latlng = await getLatLngFromAddress(fullAddress);

    if (typeof latlng === "string") {
      setErrorMessage(latlng);
      return;
    }

    const newLocation: Location = {
      endName: fullAddress,
      latlng,
    };

    if (settingStartingPoint) {
      setStartingPoint!(newLocation.latlng);
    } else {
      addLocation(newLocation);
    }

    console.log(startingPoint);
    console.log(locations);

    setSuccessMessage("Address added successfully!");
    clearForm();
  };

  return (
    <div className="form-container">
      {settingStartingPoint ? (
        <div>
          <h1>Set starting point</h1>
          <p>Fill in the information below with the address to add the starting point of the route</p>
        </div>
      ) : (
        <div>
          <h1>Add point to route</h1>
          <p>Fill in the information below with the address to add a point where the route should pass</p>
          <p className="info-message">You can fill the information of form clicking on the map!</p>
        </div>
      )}
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="address">Street address</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            placeholder="Example: Av. João Alves Filho, CENTRO"
            onChange={(e) => setStreetAddress(e.target.value)}
            value={streetAddress}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            name="city"
            id="city"
            required
            placeholder="Example: Tobias Barreto"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            name="state"
            id="state"
            required
            placeholder="Example: Sergipe"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postCode">Postcode</label>
          <input
            name="postCode"
            id="postCode"
            required
            placeholder="Example: 49300-000"
            onChange={(e) => setPostCode(e.target.value)}
            value={postCode}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            name="country"
            id="country"
            required
            placeholder="Example: Brasil"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="form-submit-btn" type="submit">
          {settingStartingPoint ? "Set starting point" : "Add point to route"}
        </button>
      </form>
    </div>
  );
};

export default Form;
