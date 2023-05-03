import React, { useState } from "react";
import "./logInPart.css";
import { Google, Facebook, GitHub } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";

import InputField from "../../InputField/InputField";
import Errormsg from "../ErrorMsgField/ErrorMsgField";
import PasswordField from "../PasswordField/passwordField";
import MainLogo from "./../../../Images/MainLogo.png";
import { apiAddress } from "../../API/api";

import ErrorpopUp, { PositivepopUp } from "../../popUp/ErrorpopUp";

const LogIn_Part = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  const [isError, setIsError] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const closeModalResponse = () => setOpenResponse(false);
  // const [data, setData] = useState({});;
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [myData, setMyData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(email, password);
      const data = { email, password };
      const response = await fetch(`${apiAddress}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      console.log(response.status);
      if (response.status === 200) {
        Cookies.set("token", result.token, { expires: 7 }); // expires after 7 days
        setOpenResponse((o) => !o);
      } else {
        console.log(result.error);
        setIsError(result.error);
        setOpenError((o) => !o);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   console.log(myData);
  // }, [myData]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // useEffect(() => {
  //   console.log(data);
  //   // fetchData();
  // }, [data]);
  // useEffect(() => {
  //   console.log(isError);
  //   // fetchData();
  // }, [isError]);

  console.log(Cookies.get("token"));
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <Popup
        open={openResponse}
        closeOnDocumentClick
        onClose={closeModalResponse}
      >
        <PositivepopUp
          PositiveHeading={"Sucessfully LogIN"}
          Positivemsg={"You have successfully logged in"}
          onClose={() => navigateToDashboard()}
        />
      </Popup>
      <Popup open={openError} closeOnDocumentClick onClose={closeModalError}>
        <ErrorpopUp Errormsg={isError} onClose={closeModalError} />
      </Popup>
      <img class="Logo_image" src={MainLogo} alt="Alt text for logo" />
      <h1>Welcome back</h1>
      <div className="inputFieldBox">
        <InputField
          label={"Email Address"}
          type={"text"}
          placeholder={"Email Address"}
          onChange={handleUsernameChange}
          value={email}
        />
        <PasswordField
          label={"Password"}
          placeholder={"Password"}
          onChange={handlePasswordChange}
          value={password}
          errorMsg={"sfgsdfgsg"}
          errorMsgHidden={false}
        />

        <p style={{ textAlign: "right" }}>Forgot password?</p>
        <Errormsg msg="errorr" hidden={true} />
        <button className="button " type="submit">
          Submit
        </button>

        <h4>LogIn With</h4>
        <div className="buttonList">
          <Button className="buttonlog" startIcon={<Google />}></Button>
          <Button className="buttonlog" startIcon={<Facebook />}></Button>
          <Button className="buttonlog" startIcon={<GitHub />}></Button>
        </div>
      </div>
    </form>
  );
};
export default LogIn_Part;
