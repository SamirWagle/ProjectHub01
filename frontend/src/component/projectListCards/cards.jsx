import React from "react";
import "./cards.css";
import DeadlineBox from "../deadlineBox/deadlineBox";
import CompleteDateBox from "../deadlineBox/completedDateBox";
import { useNavigate } from "react-router-dom";

const Cards = ({ ProjectsName, ProjectHead, Date, ImgSrc, isCompleted }) => {
const navigate=useNavigate();
const navigateToToDoPage=()=>
{
   navigate("/progress");
}
  return (
    <div onClick={navigateToToDoPage} class="projectListCardsBox">
      <img
        className="projectProfilePic"
        src={ImgSrc}
        alt="profile  for project"
      ></img>
      <h5>{ProjectsName}</h5>
      <p>{ProjectHead}</p>
      {isCompleted ? (
        <CompleteDateBox date={Date} />
      ) : (
        <DeadlineBox date={Date} />
      )}
    </div>
  );
};

export { Cards };
