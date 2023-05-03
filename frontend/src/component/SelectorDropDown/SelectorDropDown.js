import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";


import "./SelectorDropDown.css";
const SelectorDropDown = ({setProjectCategory}) => {
  // const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const optionCategories = ["BackLog", "To Do", "In Progress", "Review"];
  // useEffect(() => {
  //   fetch("https://restcountries.com/v2/all?fields=name")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountries(data);
  //     });
  // }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value.toLowerCase());
  // };
  const handleCategoryChange=(option)=>{
     setSelected(option);
  }
  const handleSelect = (option) => {
    if (option !== selected) {
      setProjectCategory(option)
      handleCategoryChange(option);
      setOpen(false);
      setInputValue("");
    }
  };

  return (
    <div className="selector-wrapper">
      <div
        onClick={handleOpen}
        className={`selector-header ${!selected && "selected"}`}
      >
        {selected ? selected : "Select Category"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul className={`selector-list ${open ? "open" : ""}`}>
        {optionCategories.map((option) => (
          <li
            key={option.name}
            className={`selector-item ${option === selected && "selected"}`}
            onClick={() => handleSelect(option)}
          >
            {option}<hr></hr>
          </li>
          
        ))}
        {/* {countries?.map((country) => (
          <li
            key={country?.name}
            className={`selector-item ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "selected"
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "visible"
                : "hidden"
            }`}
            onClick={() => handleSelect(country)}
          >
            {country?.name}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
const Selector = () => {
  
};
// const Selector = () => {
//   const [countries, setCountries] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [selected, setSelected] = useState("");
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     fetch("https://restcountries.com/v2/all?fields=name")
//       .then((res) => res.json())
//       .then((data) => {
//         setCountries(data);
//       });
//   }, []);
//   return (
//     <div className="dropDownSelectorContainer">
//       <div
//         onClick={() => setOpen(!open)}
//         className={`bg-white w-full p-2 flex items-center justify-between rounded ${
//           !selected && "text-gray-700"
//         }`}
//       >
//         {selected
//           ? selected?.length > 25
//             ? selected?.substring(0, 25) + "..."
//             : selected
//           : "Select Country"}
//         <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
//       </div>
//       <ul
//         className={`bg-white mt-2 overflow-y-auto ${
//           open ? "max-h-60" : "max-h-0"
//         } `}
//       >
//         <div className="flex items-center px-2 sticky top-0 bg-white">
//           <AiOutlineSearch size={18} className="text-gray-700" />
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value.toLowerCase())}
//             placeholder="Enter country name"
//             className="placeholder:text-gray-700 p-2 outline-none"
//           />
//         </div>
//         {countries?.map((country) => (
//           <li
//             key={country?.name}
//             className={`p-2 text-sm hover:bg-sky-600 hover:text-white
//             ${
//               country?.name?.toLowerCase() === selected?.toLowerCase() &&
//               "bg-sky-600 text-white"
//             }
//             ${
//               country?.name?.toLowerCase().startsWith(inputValue)
//                 ? "block"
//                 : "hidden"
//             }`}
//             onClick={() => {
//               if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
//                 setSelected(country?.name);
//                 setOpen(false);
//                 setInputValue("");
//               }
//             }}
//           >
//             {country?.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default SelectorDropDown;
