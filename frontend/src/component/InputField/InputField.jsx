import React from "react";
import "./InputField.css";
const InputField = ({ label, type, placeholder, value, onChange,title }) => {
    return (
      <div>
        <label style={{ textAlign: "left" }}>
          <p className="label">{label}</p>
        </label>
        <input
          className="inputBox"
          type={type}
          placeholder={placeholder}
          id="username"
          value={value}
          onChange={onChange}
          title={title}
          required
        />
      </div>
    );
  };
  export default InputField;