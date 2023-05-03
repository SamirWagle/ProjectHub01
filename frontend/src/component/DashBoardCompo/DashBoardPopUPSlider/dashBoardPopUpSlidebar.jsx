import React from "react";
import "./dashBoardPopUpSlidebar.css"
const DashBoardPopUpSlidebar = ({ isCreate, changeisCreate }) => {
  return (
    <div className="DashBoardPopUp-_slidebar">
      <div
        onClick={() => changeisCreate(true)}
        className="DashBoardPopUp-_slidebar_content"
        style={{
          background:isCreate ? "black" : "transparent",
          color: isCreate ? "white" : "black",
        }}
      >
        Create Project
      </div>
      <div
        onClick={() => changeisCreate(false)}
        className="DashBoardPopUp-_slidebar_content"
        style={{
          background: ! isCreate ? "black" :"transparent",
          color: ! isCreate ? "white" : "black",
        }}
      >
      Join Project
      </div>
    </div>
  );
};

export default DashBoardPopUpSlidebar;
