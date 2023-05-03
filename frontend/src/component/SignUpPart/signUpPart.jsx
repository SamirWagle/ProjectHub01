import React, { useState } from "react";
import { Google, Facebook, GitHub } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./signUpPart.css";

import InputField from "../InputField/InputField";
import Errormsg from "../ErrorMsgField/ErrorMsgField";
import PasswordField from "../PasswordField/passwordField";
import MainLogo from "./../../Images/MainLogo.png";
import GenderSelectorDropdown from "../SelectorDropDown/GenderSelectorDropdown";
import "react-datepicker/dist/react-datepicker.css";
import { apiAddress } from "../API/api";
import { PositivepopUp } from "../popUp/ErrorpopUp";
import ErrorpopUp from "../popUp/ErrorpopUp";

const SignUp_Part = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const closeModalResponse = () => setOpenResponse(false);
  const [forwardCreateProfile, createForwardCreateProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gitlink, setgitLinks] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDoB] = useState(new Date());
  const [phonenumber, setPhonenumber] = useState("");
  const [hideError, setHideError] = useState(true);

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = date.getDate();
    const newDate = new Date(`${year}-${month}-${day}`);

    setDoB(newDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        setHideError(false);
      }
      if (password === confirmPassword) {
        setHideError(true);
        console.log(email, password);
        const data = { email, password };
        const response = await fetch(`${apiAddress}user/signup`, {
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
          Cookies.set("token", result.token, { expires: 7 });
          createForwardCreateProfile(true);
        } else {
          console.log(result.error);
          setErrorMsg(result.error);
          setOpenError((o) => !o);
          console.log();
        }
      }
      console.log(
        `Submitted username: ${email} Submitted passowrd ${password} Submitted passowrd ${confirmPassword}`
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateProfile = async (event) => {
    event.preventDefault();
    console.log(
      ` Submitted name ${name} Submitted pphonme ${phonenumber} git links ${gitlink} DOB ${dob}  Gender ${gender}`
    );
    try {
      const data = { name, phonenumber, gitlink, gender, dob };
      const response = await fetch(`${apiAddress}user/createprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
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
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Popup
        open={openResponse}
        closeOnDocumentClick
        onClose={closeModalResponse}
      >
        <PositivepopUp
          PositiveHeading={"Your profile has been created"}
          Positivemsg={""}
          onClose={() => navigateToDashboard()}
        />
      </Popup>
      <Popup open={openError} closeOnDocumentClick onClose={closeModalError}>
        <ErrorpopUp Errormsg={errorMsg} onClose={closeModalError} />
      </Popup>
      {!forwardCreateProfile ? (
        <form className="signupForm" onSubmit={handleSubmit}>
          <img class="Logo_image" src={MainLogo} alt="Alt text for logo" />
          <h2>Welcome</h2>
          <div className="inputFieldBox">
            <InputField
              label={""}
              type={"email"}
              placeholder={"Email"}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              title={"Please enter your valid email address"}
            />
            <PasswordField
              label={""}
              placeholder={"Password"}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <PasswordField
              label={""}
              placeholder={"Confirm Password"}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              value={confirmPassword}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <Errormsg msg="Password doesnot match" hidden={hideError} />
            <button className="button " type="submit">
              Sign Up
            </button>

            <h4>SignUP With</h4>
            <div className="buttonList">
              <Button className="buttonlog" startIcon={<Google />}></Button>
              <Button className="buttonlog" startIcon={<Facebook />}></Button>
              <Button className="buttonlog" startIcon={<GitHub />}></Button>
            </div>
          </div>
        </form>
      ) : (
        <form className="signupForm" onSubmit={handleCreateProfile}>
          <img class="Logo_image" src={MainLogo} alt="Alt text for logo" />
          <h2>Welcome</h2>
          <div className="inputFieldBox">
            <div>
              <InputField
                label={""}
                type={"text"}
                placeholder={"Name"}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
              <InputField
                label={""}
                type={"number"}
                placeholder={"Phone Number"}
                onChange={(event) => {
                  setPhonenumber(event.target.value);
                }}
                value={phonenumber}
              />
              <InputField
                label={""}
                type={"text"}
                placeholder={"Git Link"}
                onChange={(event) => {
                  setgitLinks(event.target.value);
                }}
                value={gitlink}
              />
              <GenderSelectorDropdown setGender={setGender} />
              <DatePicker
                className="DateBoxcreate_ProfileDateBox"
                selected={dob}
                onChange={handleDateChange}
              />
              <button className="button " type="submit">
                Create Profile
              </button>
              <br />
              <br></br>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default SignUp_Part;
