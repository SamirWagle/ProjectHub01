import React, { useState } from "react";
import "./LandingPopUp.css";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import DashBoardPopUpSlidebar from "../SlideBar/dashBoardPopUpSlidebar";
import { useNavigate } from "react-router-dom";
import { apiAddress } from "../../component/API/api";
import { GetToken } from "../../GlobalVariable";
import ErrorpopUp, { PositivepopUp } from "./ErrorpopUp";
import Popup from "reactjs-popup";

const PopUpDashboard = ({ onClose }) => {
  const navigateToProjectPage=()=>
{
   navigate("/projectPage");
}
const navigate=useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeModalResponse = () => setOpenResponse(false);
  const closeModalError = () => setOpenError(false);
  const [isCreate, changeisCreate] = useState(true);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [projectTime, setProjectTime] = useState(0);
  const [deadline, setDeadline] = useState(new Date());

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const data = { title, deadline };
    console.log("1");
    console.log(title, deadline);
    try {
      const response = await fetch(`${apiAddress}project/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GetToken()}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 200) {
        console.log(`Successfully created`);
        setOpenResponse((o) => !o);
      } else {
        console.log(result.error);
        setErrorMsg(result.error);
        setOpenError((o) => !o);
        console.log();
      }
    } catch (error) {
      console.error(error);
      console.log("3");
    }
    // onClose();
  };

  const handleJoinSubmit = async (event) => {
    event.preventDefault();
    const data = { code };
    console.log(code);
    try {
      const response = await fetch(`${apiAddress}project/join`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GetToken()}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 200) {
        console.log(result);
        console.log(`Successfully joined`);
        setOpenResponse((o) => !o);
      } else {
        console.log(result.error);
        setErrorMsg(result.error);
        setOpenError((o) => !o);
        console.log();
      }
    } catch (error) {
      console.error(error);
      console.log("3");
    }
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = date.getDate();
    const newDate = new Date(`${year}-${month}-${day}`);
    setDeadline(newDate);
  };

  return (
    <div className="modal">
      <Popup
        open={openResponse}
        closeOnDocumentClick
        // onClose={navigateToProjectPage}
      >
        <PositivepopUp
          PositiveHeading={"Your Project has been created"}
          Positivemsg={""}
          onClose={() =>  navigateToProjectPage}
        />
      </Popup>

      <Popup open={openError} closeOnDocumentClick onClose={closeModalError}>
        <ErrorpopUp Errormsg={errorMsg} onClose={closeModalError} />
      </Popup>

      <div className="LandingpopUpDiv " style={{ background: "transparent" }}>
        {isCreate ? (
          <form className="Landingpopup-form" onSubmit={handleCreateSubmit}>
            <div className="iconDiv">
              <LibraryAddOutlinedIcon
                fontSize="large"
                className="assignmentIcon"
              />
            </div>
            <br></br>
            <DashBoardPopUpSlidebar
              isCreate={isCreate}
              changeisCreate={changeisCreate}
            />
            <div>
              <InputField
                label={"Project Name :"}
                type={"text"}
                placeholder={"Project Name"}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />

              <p style={{ margin: "10px 0 -5px 0" }}>DeadLine :</p>
              <DatePicker
                className="DateBox"
                selected={deadline}
                onChange={handleDateChange}
              />

              <br />
              <button className="assignbutton ">Create Project</button>
            </div>
          </form>
        ) : (
          <form className="Landingpopup-form" onSubmit={handleJoinSubmit}>
            <div className="iconDiv">
              <LibraryAddOutlinedIcon
                fontSize="large"
                className="assignmentIcon"
              />
            </div>
            <br></br>
            <DashBoardPopUpSlidebar
              isCreate={isCreate}
              changeisCreate={changeisCreate}
            />
            <div>
              <InputField
                label={"Project Code:"}
                type={"text"}
                placeholder={"Project code"}
                onChange={(event) => setCode(event.target.value)}
                value={code}
              />
              {/* <InputField
                label={"Time for this project per days (in Hours):"}
                type={"number"}
                placeholder={"Time for this project per days"}
                onChange={(event) => setProjectTime(event.target.value)}
                value={projectTime}
              /> */}
              <button className="assignbutton " type="submit">
                Join Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default PopUpDashboard;
