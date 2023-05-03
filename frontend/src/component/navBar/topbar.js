import React from "react";
import "./topbar.css";
import Avatar1 from "./../../Images/avatar.png";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AddIcon from "@mui/icons-material/Add";
import MainLogo from "./../../Images/MainLogo.png";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Topbar = () => {
  const navigate = useNavigate();
  const navigateToDeadlineList = () => {
    navigate("/deadline");
  };
  const navigateToProfilePage = () => {
    return navigate("/profilepage");
  };
  const navigateToDashboard = () => {
    return navigate("/dashboard");
  };

  return (
    <div class="dashboardTopbar">
      <img
        onClick={navigateToDashboard}
        className="TopbarLogo"
        alt="  Project Hub"
        src={MainLogo}
      />

      <div class="dashboardEndbutton">
        <div onClick={navigateToDeadlineList} style={{ all: "inherit" }}>
          <AssignmentIcon />
        </div>

        <AddIcon />
        <NotificationsActiveIcon />
        <div onClick={navigateToProfilePage} style={{ all: "inherit" }}>
          <Avatar className="avatarItems" src={Avatar1} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

// class Topbar extends React.Component {
