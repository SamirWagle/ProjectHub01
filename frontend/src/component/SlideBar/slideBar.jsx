import React from "react";
// import { GestureDetector } from "react-onsenui";
import "./slideBar.css";

const SlideBar = ({ isSignup, changeSignup }) => {
  // const [isSignup, changeSignup] = useState(false);

  return (
    <div className="top_slidebar">
      <div
        onClick={() => changeSignup(false)}
        className="top_slidebar_content"
        style={{
          background: !isSignup ? "black" : "white",
          color: !isSignup ? "white" : "black",
        }}
      >
        logIn
      </div>{" "}
      <div
        onClick={() => changeSignup(true)}
        className="top_slidebar_content"
        style={{
          background: isSignup ? "black" : "white",
          color: isSignup ? "white" : "black",
        }}
      >
        Sign Up
      </div>
    </div>
  );
};
export default SlideBar;
