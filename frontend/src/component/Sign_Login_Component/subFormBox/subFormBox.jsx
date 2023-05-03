import React from "react";
import "./subFormBox.css";
import SignUp_Part from "../SignUpPart/signUpPart";
import LogIn_Part from "../logInPart/logInPart";
const SubFormBox = ({ isSignup, changeSignup }) => {
    return (
      <div >
        {/* eslint-disable-next-line  */}
        {isSignup ? <SignUp_Part /> : <LogIn_Part />}
      </div>
    );
  };

  export default SubFormBox;