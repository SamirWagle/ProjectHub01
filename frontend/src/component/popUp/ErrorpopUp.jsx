import React, { useState } from "react";
import "./ErrorpopUp.css";
import { Fab } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from '@mui/icons-material/Done';
import Popup from "reactjs-popup";
const Ssssss = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <Fab
      onClick={() => setOpen((o) => !o)}
      color="primary"
      aria-label="add"
      style={{ position: "fixed", bottom: 32, right: 32, zIndex: 999 }}
    >
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        {/* <ErrorpopUpppp Errormsg="svdsvdv" onClose={closeModal} /> */}
         <PositivepopUp PositiveHeading={"Sucessfully LogIN"} Positivemsg={"you have sucessfully "} onClose={closeModal} />
      </Popup>
      dsxgvdsrgdsfg
    </Fab>
  );
};

const ErrorpopUp = ({Errormsg,onClose}) => {
  return (
    <div>
      <div className="modal">
        <div className="Error_LandingpopUpDiv ">
          <div className="Error_iconDiv">
            <ErrorOutlineIcon
              fontSize="large"
              className="Error_assignmentIcon"
            />
          </div>
          <h2 className="Error_msg_heading">ERROR</h2>
          <div className="Error_msg">{Errormsg}</div>
          <button className="Error_assignbutton" onClick={onClose}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

const PositivepopUp = ({PositiveHeading,Positivemsg,onClose}) => {
    return (
      <div>
        <div className="modal">
          <div className="Positive_LandingpopUpDiv ">
            <div className="Positive_iconDiv">
              <DoneIcon
                fontSize="large"
                className="Positive_DoneIcon"
              />
            </div>
            <h2 className="Positive_msg_heading">{PositiveHeading}</h2>
            <div className="Positive_msg">{Positivemsg}</div>
            <button className="Positive_assignbutton" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };
  

 export {PositivepopUp} 
export default ErrorpopUp;
