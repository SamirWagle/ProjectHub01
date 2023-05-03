import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./ToDoMembersSelectionDropDown.css"

const ToDoMembersSelectionDropDown = ({members,setMembers}) => {
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    var optionCategories =[""];
    for (let name of members) {
        // console.log(name); 
        optionCategories.push(name.name);
        
    }
    const handleOpen = () => {
      setOpen(!open);
    };
  
    const handleCategoryChange=(option)=>{
       setSelected(option);
    }
    const handleSelect = (option) => {
      if (option !== selected) {
        setMembers(option)
        handleCategoryChange(option);
        setOpen(false);
        setInputValue("");
      }
    };
  
    return (
      <div className="member_selector-wrapper">
        <div
          onClick={handleOpen}
          className={`member_selector-header ${!selected && "selected"}`}
        >
          {selected ? selected : "Assigned To:"}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul className={`member_selector-list ${open ? "open" : ""}`}>
          {optionCategories.map((option) => (
            <li
              key={option.name}
              className={`member_selector-item ${option === selected && "selected"}`}
              onClick={() => handleSelect(option)}
            >
              {option}<hr></hr>
            </li>
            
          ))}
        </ul>
      </div>
    );
}

export default ToDoMembersSelectionDropDown

// const SelectorDropDown = ({setProjectCategory}) => {

 
// };
// const Selector = () => {
  
// };
// export default SelectorDropDown;
