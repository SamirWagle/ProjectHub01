import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./dashboardCards.css";

import DeadlineBox from "../deadlineBox/deadlineBox.jsx";
import CompleteDateBox from "../deadlineBox/completedDateBox";
import { apiAddress } from "../../API/api.jsx";
import { GetToken } from "../../../GlobalVariable";

const Cards = ({
  title,
  createdby,
  deadline,
  ImgSrc,
  isCompleted,
  projectid,
}) => {
  const [responseText, setResponseText] = useState("");
  const [responseStatus, setResponseStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const navigateToProjectPage = () => {
    
    navigate(`/projectPage?id=${projectid}`);
  };
  const navigate = useNavigate();
  const [iscomplete, setIsActive] = useState(isCompleted);

  function handleClick() {
    setIsActive((prevState) => !prevState);
  }
  const [run, changeRun] = useState(!isCompleted);

  useEffect(() => {
    if (iscomplete == run) {
      changeRun(false);
      const token = GetToken();
      const data = { iscomplete };
      fetch(`${apiAddress}project/update/${projectid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          setResponseStatus(response.status);
          console.log(response.status);
          return response.json();
        })
        .then((data) => {
          if (responseStatus == 200) {
            console.log(data);
            setResponseText(data.message);
            console.log(responseText);
          } else {
            setErrorMsg(data.error);
            console.log(errorMsg);
          }
          console.log(data);
        })
        .catch((error) => {
          // handle errors here
          console.error(error);
        });
    }
  }, [iscomplete]);

  return (
    <div class="dashboardCardsBox">
      <div onClick={navigateToProjectPage}>
        <img
          className="projectProfilePic"
          src={ImgSrc}
          alt="profile  for project"
        ></img>
        <h5>{title}</h5>
        <p>{createdby}</p>
        {isCompleted ? (
          <CompleteDateBox date={deadline} />
        ) : (
          <DeadlineBox date={deadline} />
        )}
      </div>

      <div className="completed_togglebutton">
        Set as completed
        <button
          className={`toggle-button ${iscomplete ? "active" : ""}`}
          onClick={handleClick}
        >
          <div className="toggle-button__inner" />
        </button>
      </div>
    </div>
  );
};

export default Cards;
export { Cards };
