import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";


import "./GenderSelectorDropdown.css";
const GenderSelectorDropdown = ({setGender}) => {
  // const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const optionCategories = ["Male","Female","Non-Binary"];
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCategoryChange=(option)=>{
     setSelected(option);
  }
  const handleSelect = (option) => {
    if (option !== selected) {
      setGender(option)
      handleCategoryChange(option);
      setOpen(false);
      setInputValue("");
    }
  };

  return (
    <div className="gender_selector-wrapper">
      <div
        onClick={handleOpen}
        className={`gender_selector-header ${!selected && "selected"}`}
      >
        {selected ? selected : "Select Category"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul className={`gender_selector-list ${open ? "open" : ""}`}>
        {optionCategories.map((option) => (
          <li
            key={option.name}
            className={`gender_selector-item ${option === selected && "selected"}`}
            onClick={() => handleSelect(option)}
          >
            {option}<hr></hr>
          </li>
          
        ))}
        
      </ul>
    </div>
  );
};


export default GenderSelectorDropdown;
