import "./index.scss";

interface InputProps {
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const Input = ({ label, name, required = false, placeholder, onChange, value, type = "text" }: InputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
