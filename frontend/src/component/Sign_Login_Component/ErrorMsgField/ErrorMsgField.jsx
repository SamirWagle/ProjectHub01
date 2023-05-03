import React from "react";
import "./ErrorMsgField.css";
const Errormsg = ({ msg, hidden }) => {
  return (
    <div className="errorMsg" style={{ display: hidden ? "none" : "block" }}>
      {msg}
    </div>
  );
};
export default Errormsg;
