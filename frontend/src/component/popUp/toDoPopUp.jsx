import React, { useState, useEffect } from "react";
import "./toDoPopUp.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectorDropDown from "../SelectorDropDown/SelectorDropDown";
import { apiAddress } from "../API/api";
// import ErrorpopUp,{ PositivepopUp } from "../popUp/ErrorpopUp";
import ToDoMembersSelectionDropDown from "../ToDo_Component/ToDoMembersSelectionDropDown/ToDoMembersSelectionDropDown";
import { GetToken } from "../../GlobalVariable";

import ErrorpopUp, { PositivepopUp } from "../popUp/ErrorpopUp";
import Popup from "reactjs-popup";
const PopUpToDo = ({
  onClose,
  onPressed,
  contentInfo,
  changeContentInfo,
  id,
  membersList,
}) => {
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [point, setPoint] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [tag, setTag] = useState("");
  const [assignedNameto, setAssignedto] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const closeModalResponse = () => setOpenResponse(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  var assignedto = null;

  const handleSubmit = async (event) => {
    assignedto = FindId(assignedNameto);
    event.preventDefault();
    const data = { tag, label, title, detail, point, assignedto, deadline };
    const token = GetToken();
    console.log(data);
    var code = 0;
    try {
      const response = await fetch(`${apiAddress}todo/create/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      console.log(response.status);
      if (response.status === 200) {
        setOpenResponse(true);
      } else {
        console.log(result.error);
        setErrorMsg(result.error);
        setOpenError((o) => !o);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const FindId = (name) => {
    console.log(membersList);
    for (let i = 0; i < membersList.length; i++) {
      if (membersList[i].name === name) {
        console.log(membersList[i]._id);
        return membersList[i].id;
      }
    }
    return null;
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
        onClose={closeModalResponse}
      >
        <PositivepopUp
          PositiveHeading={"Your Task has been added"}
          Positivemsg={""}
          onClose={() => ""}
        />
      </Popup>
      <Popup open={openError} closeOnDocumentClick onClose={closeModalError}>
        <ErrorpopUp Errormsg={errorMsg} onClose={closeModalError} />
      </Popup>
      <div className="LandingpopUpDiv " style={{ background: "transparent" }}>
        <form className="Landingpopup-form" onSubmit={handleSubmit}>
          <div className="iconDiv">
            <AssignmentIcon fontSize="large" className="assignmentIcon" />
          </div>
          <SelectorDropDown setProjectCategory={setTag} />
          <InputField
            label={""}
            type={"text"}
            placeholder={"Project Label"}
            onChange={(event) => setLabel(event.target.value)}
            value={label}
          />
          <InputField
            label={""}
            type={"text"}
            placeholder={"Project Name"}
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <InputField
            label={""}
            type={"text"}
            placeholder={"Project Description"}
            onChange={(event) => setDetail(event.target.value)}
            value={detail}
          />
          <ToDoMembersSelectionDropDown
            members={membersList}
            setMembers={setAssignedto}
          />
          <InputField
            label={""}
            type={"number"}
            placeholder={"Task Points"}
            onChange={(event) => setPoint(event.target.value)}
            value={point}
          />
          <DatePicker
            className="DateBox"
            selected={deadline}
            onChange={handleDateChange}
          />
          <br />
          <button className="assignbutton " type="submit">
            Assign
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUpToDo;
