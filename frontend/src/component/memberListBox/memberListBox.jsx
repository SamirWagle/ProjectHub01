import React from "react";
import "./memberListBox.css";
import { Avatar } from "@material-ui/core";
import avatar from "./../../Images/avatar.png"
import avatar2 from "./../../Images/avatar2.png";
const MemberListBox = () => {
  const members = [
    { id: 1, names: "Samantha", imgSrc: avatar },
    { id: 2, names: "Carlos", imgSrc: avatar2 },
    { id: 3, names: "Emily", imgSrc: avatar },
    { id: 4, names: "Ryan", imgSrc: avatar2 },
    { id: 5, names: "Maria", imgSrc: avatar },
    { id: 6, names: "Jacob", imgSrc: avatar2 },
    { id: 7, names: "Rachel", imgSrc: avatar },
  ];
  return (
    <div className="memberContainer">
      <div className="memberTitleContainer">
        <h3>Memebers</h3>
      </div>
      {members.map((items) => (
        <MemberListTiles key={items.id} {...items} />
      ))}

      {/* <MemberListTiles />
   <MemberListTiles />
   <MemberListTiles />
   <MemberListTiles /> */}
    </div>
  );
};

const MemberListTiles = ({ names, imgSrc }) => {
  return (
    <div>
      <div className="member">
        <Avatar className="memberPhoto" alt="image" src={imgSrc} />
        <div className="memberName">{names}</div>
      </div>{" "}
      <div className="dividers"></div>
    </div>
  );
};

export default MemberListBox;
