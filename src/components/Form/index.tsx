import "./index.css";

const Form = () => {
  return (
    <div className="form-container">
      <div>
        <h1>Add point to route</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. quam aliquam beatae commodi assumenda
          doloremque.
        </p>
      </div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input name="city" id="city" required></input>
        </div>
        <button className="form-submit-btn" type="submit">
          Save Point
        </button>
      </div>
    </div>
  );
};

export default Form;
