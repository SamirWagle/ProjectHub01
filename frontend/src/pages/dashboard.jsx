import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./dashboard.css";

import Topbar from "../component/navBar/topbar";
import Cards from "../component/DashBoardCompo/dashboardCards/dashboardCards.js";
import DashBoardSlideBar from "../component/DashBoardCompo/dashBoardSlidebar/dashBoardSlidebar";
import Avatar1 from "./../Images/avatar.png";
import profilePic_1 from "../Images/CardProfilePic_1.png";
// import profilePic_2 from "../Images/CardProfilePic_2.png";
// import profilePic_3 from "../Images/CardProfilePic_3.png";
// import profilePic_4 from "../Images/CardProfilePic_4.png";
// import profilePic_5 from "../Images/CardProfilePic_5.png";
// import profilePic_6 from "../Images/CardProfilePic_6.png";
import PopUpDashboard from "../component/DashBoardCompo/dashboardPopUP/dashboardPopUP";

import Popup from "reactjs-popup";
import { apiAddress } from "../component/API/api";
import { GetToken } from "../GlobalVariable";
import ErrorpopUp from "../component/popUp/ErrorpopUp";
import { ThreeCircles as Loading } from "react-loader-spinner";

const Dashboard = () => {
  let run = true;
  useEffect(() => {
    if (run === true) {
      const token = GetToken();
      setIsLoading(true);
      fetch(`${apiAddress}user/getname`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("dashboard" + response.status);
          setResponseNameCode(response.status);
          return response.json();
        })
        .then((data) => {
          setUsername(data.name);
          setIsLoading(false);
        });
      fetch(`${apiAddress}project/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setResponseCode(response.status);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            // console.log(i)
            const newData = {
              completedflag: data[i].completedflag,
              id: data[i].createdby._id,
              projectid: data[i]._id,
              title: data[i].title,
              createdby: data[i].createdby.name,
              deadline: data[i].deadline,
              ImgSrc: profilePic_1,
            };
            // console.log(newData)
            setData((prevData) => [...prevData, newData]);
            // console.log(projectDetails1)
          }
          setIsLoading(false);
        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });

      run = false;
    }
  }, []);

  // const projectDetails = [
  //   {
  //     id: 1,
  //     title: "Green City",
  //     createdby: "Emma",
  //     deadline: "2023-11-01",
  //     ImgSrc: profilePic_1,
  //   },
  //   {
  //     id: 2,
  //     title: "TechConnect",
  //     createdby: "Noah",
  //     deadline: "2024-07-08",
  //     ImgSrc: profilePic_2,
  //   },
  //   {
  //     id: 3,
  //     title: "HealthFirst",
  //     createdby: "Sophia",
  //     deadline: "2024-09-15",
  //     ImgSrc: profilePic_3,
  //   },
  //   {
  //     id: 4,
  //     title: "YouthEmpower",
  //     createdby: "William",
  //     deadline: "2024-11-27",
  //     ImgSrc: profilePic_4,
  //   },
  //   {
  //     id: 5,
  //     title: "ArtVentures",
  //     createdby: "Ava",
  //     deadline: "2025-02-19",
  //     ImgSrc: profilePic_3,
  //   },
  //   {
  //     id: 6,
  //     title: "Green City",
  //     createdby: "Emma",
  //     deadline: "2023-11-01",
  //     ImgSrc: profilePic_4,
  //   },
  //   {
  //     id: 7,
  //     title: "TechConnect",
  //     createdby: "Noah",
  //     deadline: "2024-07-08",
  //     ImgSrc: profilePic_5,
  //   },
  //   {
  //     id: 8,
  //     title: "HealthFirst",
  //     createdby: "Sophia",
  //     deadline: "2024-09-15",
  //     ImgSrc: profilePic_6,
  //   },
  //   {
  //     id: 9,
  //     title: "YouthEmpower",
  //     createdby: "William",
  //     deadline: "2024-11-27",
  //     ImgSrc: profilePic_1,
  //   },
  //   {
  //     id: 10,
  //     title: "ArtVentures",
  //     createdby: "Ava",
  //     deadline: "2025-02-19",
  //     ImgSrc: profilePic_2,
  //   },
  // ];

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [responseNameCode, setResponseNameCode] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, changeCompleted] = useState(false);

  const [projectDetails1, setData] = useState([]);
  const [userName, setUsername] = useState("Loading");
  function CardGenerator({ data }) {
    return (
      <div class="dashboardBlocks">
        {/* {console.log(projectDetails1)}  */}
        {data.map((projects) => (
          <Cards isCompleted={isCompleted} key={projects.id} {...projects} />
        ))}
      </div>
    );
  }

  const uncompletedProject = projectDetails1.filter(
    (project) => project.completedflag === false
  );
  const completedProject = projectDetails1.filter(
    (project) => project.completedflag === true
  );
  return (
    <div className="DashBoard">
      {responseNameCode || responseCode !== 200 ? (
        <Popup open={openError} closeOnDocumentClick onClose={closeModalError}>
          <ErrorpopUp
            Errormsg={"Error has Occured"}
            onClose={closeModalError}
          />
        </Popup>
      ) : (
        ""
      )}
      <Topbar />
      <div class="greetings">
        <div className="greetingsUser">
          <Avatar className="avatarItems" src={Avatar1} />
          <div>Welcome, {userName}</div>
        </div>

        <div>
          <DashBoardSlideBar
            isCompleted={isCompleted}
            changeCompleted={changeCompleted}
          />
        </div>
      </div>
      <hr />
      {isLoading && (
        <Loading
          className="Spinnner"
          type="Puff"
          color="#00BFFF"
          height={300}
          width={window.innerWidth}
        />
      )}

      {!isLoading &&
        projectDetails1 &&
        (!isCompleted ? (
          <CardGenerator data={uncompletedProject} />
        ) : (
          <CardGenerator data={completedProject} />
        ))}
      {/*  */}
      {/* <div class="dashboardBlocks">
      {console.log("dfgdfgdfgfg")}{console.log(projectDetails1)}
        {projectDetails1.map((projects) => (
          <Cards isCompleted={isCompleted} key={projects.id} {...projects} />
        ))}
      </div> */}

      {/* { console.log(responseCode)} */}

      <Fab
        onClick={() => setOpen((o) => !o)}
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 999 }}
      >
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <PopUpDashboard onClose={closeModal} />
        </Popup>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Dashboard;
