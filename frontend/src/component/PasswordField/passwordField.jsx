import React, { useState } from "react";
import "./passwordField.css";
// import Errormsg from "../ErrorMsgField/ErrorMsgField";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  placeholder,
  label,
  value,
  onChange,
  pattern
}) => {
  const [visible, setVisible] = useState(false);
  const HandleToggle = () => {
    return setVisible(!visible);
  };
  return (
    <div>
      <label style={{ textAlign: "left" }}>
        <p className="label">{label}</p>
      </label>
      <div className="wrapper">
    
        <input
          className="passwordBox"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          pattern={pattern}
          required={true}
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
        <div className="eyeButton" onClick={HandleToggle}>
          {visible ? <RemoveRedEye /> : <VisibilityOff />}
        </div>  
      </div>
    

    </div>
  );
};

export default PasswordField;
