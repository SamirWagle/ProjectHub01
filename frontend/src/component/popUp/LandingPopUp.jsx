import React, { useState } from "react";
import "./LandingPopUp.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectorDropDown from "../SelectorDropDown/SelectorDropDown";
import { apiAddress } from "../API/api"; 
// import ErrorpopUp,{ PositivepopUp } from "../popUp/ErrorpopUp";

import Popup from "reactjs-popup";
import { GetToken } from "../../GlobalVariable";
import { ThreeCircles as Loading } from "react-loader-spinner";

const PopUpToDo = ({ onClose, onPressed, contentInfo, changeContentInfo,id }) => {
  const onAddTask = (title, label, projectTitle, projectSubTitle, date) => {
    const newtaskInfo = {
     
      title: title, id: contentInfo[contentInfo.length - 1].id + 1,
      label: label,
      projectTitle: projectTitle,
      projectSubTitle: projectSubTitle,
      date: date.toISOString().slice(0,10),
    };
    
  
    changeContentInfo([...contentInfo,newtaskInfo]);
    // console.log([contentInfo]);
  };
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const[point,setPoint]=useState(0);
  // const [projectSubDescription, setProjectSubDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [tag, setTag] = useState("");
  const [assignedto,setAssignedto]=useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const closeModalResponse = () => setOpenResponse(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [responseNameCode, setResponseNameCode] = useState(null);
  const [responseDataCode, setResponsedataCode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log({
      tag,
      label,
      title,
      detail,
      point,
      assignedto,
      deadline,
    });
    const data = { tag,
      label,
      title,
      detail,
      point,
      assignedto,
      deadline, };
      const token = GetToken();
      
    fetch(`${apiAddress}todo/create/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(data)
    })
      .then((response) => {
        setResponsedataCode(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      }).catch(error => {
        // handle errors
        console.error(error);
      });

    // onAddTask(
    //   tag,
    //   Label,
    //   title,
    //   detail,
    //   deadline
    // );
    onClose();
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = date.getDate();
    const newDate = new Date(`${year}-${month}-${day}`);
    setDeadline(newDate);
  };

  // ${onClose?"closed":"opened"}
  return (
    <div className="modal">
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
           <InputField
            label={""}
            type={"number"}
            placeholder={"Task Points"}
            onChange={(event) => setPoint(event.target.value)}
            value={point}
          />
           <InputField
            label={""}
            type={"text"}
            placeholder={"Assigned to:"}
            onChange={(event) => setAssignedto(event.target.value)}
            value={assignedto}
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
