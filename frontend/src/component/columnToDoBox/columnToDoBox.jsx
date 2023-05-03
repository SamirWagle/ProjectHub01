import React, { useState, useRef, useEffect } from "react";
import "./columnToDoBox.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PopUpToDo from "../popUp/toDoPopUp";
import Popup from "reactjs-popup";
import { useLocation } from "react-router-dom";
import { apiAddress } from "../API/api";
import { GetToken } from "../../GlobalVariable";
const ColumnProgessBox = ({
  selfID,
  title,
  membersList,
  contentInfo,
  changeContentInfo,
  onAddPressed,
    isHead
}) => {
 
  const [toWhere, changeToWhere] = useState("");
  const [Projectid, setId] = useState(null);
  const [assignedtoID,setAssignedtoID]=useState(null)
  const onClickChange = (id, toWhere) => {
    const updatedContentInfo = contentInfo.map((element) =>
      element.id === id ? { ...element, title: toWhere } : element
    );
    changeContentInfo(updatedContentInfo);
  };
  const location = useLocation();

  useEffect(() => {
    setAssignedtoID()
    const searchParams = new URLSearchParams(location.search);
    const Id = searchParams.get("id");
    setId(Id);
    // console.log(contentInfo);
  });
  const onClicked = () => {};
  return (
    <div className="columnProgessBox">
      <Title
        membersList={membersList}
        isHead={isHead}
        title={title}
        contentInfo={contentInfo}
        changeContentInfo={changeContentInfo}
      />
      {contentInfo.map((content) =>
        content.tag === title ? (
          <Content
          assignedtoName={content.assignedtoName}
          selfID={selfID}
          assignedtoID={content.assignedto}
            isHead={isHead}
            key={content._id}
            taskID={content._id}
            {...content}
            changeToWhere={changeToWhere}
            onClick={() => {
              onClickChange(content.id, toWhere);
            }}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};

const Title = ({
  title,
  contentInfo,
  changeContentInfo,
  isHead,
  membersList,
}) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const location = useLocation();
  const [id, setId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    setId(id);
  }, [location.search]);
  return (
    <div>
      {/* {console.log(contentInfo)} */}
      <div className="title">
        <h5>{title}</h5>
        {isHead ? (
          <AddIcon onClick={() => setOpen((o) => !o)} className="addIcon" />
        ) : (
          ""
        )}
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <PopUpToDo
            membersList={membersList}
            id={id}
            contentInfo={contentInfo}
            changeContentInfo={changeContentInfo}
            onClose={closeModal}
          />
        </Popup>
      </div>
    </div>
  );
};

const Content = ({
  selfID,
  taskID,
  assignedtoName,
  assignedtoID,
  label,
  title,
  detail,
  deadline,
  onClick,
  onDoubleClick,
  changeToWhere,
  isHead,
}) => {
  // eslint-disable-next-line
  const [isSelf, changeIsSelf] = useState(false);
  const [open, setOpen] = useState(false);
  const [Projectid, setId] = useState(null);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    var check=selfID===assignedtoID;
    changeIsSelf(check);
    // changeIsSelf(true)
    document.addEventListener("mousedown", handler);
    const searchParams = new URLSearchParams(location.search);
    const Id = searchParams.get("id");
    setId(Id);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [title1, migrateWhere] = useState("");
  const location = useLocation();

  const onClick1 = async () => {
    const token = GetToken(),
      data = { tag: title1 };

    console.log(data);
    try {
      const response = await fetch(
        `${apiAddress}todo/update/${Projectid}/${taskID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
      console.log(response.status);
      if (response.status === 200) {
        console.log("sdcsdcdc");
      } else {
        console.log(result.error);
        // setErrorMsg(result.error);
        // setOpenError((o) => !o);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    
    <div
    //self may be needed to change
      style={{ backgroundColor: `${!isSelf ? "white" : "#ccc"}` }}
      className="content"
      onDrag={onDoubleClick}
    >
    {/* {console.log(selfID,assignedtoID)} */}
      <div className="date_DropDown">
        <div className="label">{label}</div>

        {isSelf || isHead ? (
          <div className="menu-container" ref={menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <ul>
                <DropdownItem
                  changeToWhere={migrateWhere}
                  // {changeToWhere}
                  onClick={onClick1}
                  text={"BackLog"}
                />
                <DropdownItem
                  changeToWhere={migrateWhere}
                  // {changeToWhere}
                  onClick={onClick1}
                  text={"To Do"}
                />
                <DropdownItem
                  changeToWhere={migrateWhere}
                  // {changeToWhere}
                  onClick={onClick1}
                  text={"In Progress"}
                />
                <DropdownItem
                  changeToWhere={migrateWhere}
                  // {changeToWhere}
                  onClick={onClick1}
                  text={"Review"}
                />
                {isHead ? (
                  <DropdownItem
                    changeToWhere={migrateWhere}
                    onClick={onClick1}
                    text={"Completed"}
                  />
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="projectTitle">{title}</div>
      <div className="projectSubTitle">{detail}</div>
      <div className="datebox">{deadline}</div>
      <br></br>
      <div>Assign to: {assignedtoName}</div>
    </div>
  );
};
function DropdownItem({ changeToWhere, onClick, text }) {
  const [d, cd] = useState(false);
  async function handleClicked() {
    changeToWhere(text);
    cd(true);
    console.log(d);
  }
  useEffect(() => {
    if (d) {
      onClick();
    }
    // eslint-disable-next-line
  }, [d]);
  return (
    // eslint-disable-next-line
    <li className="dropdownItem" onClick={handleClicked}>
      <div> {text} </div>
    </li>
  );
}

export default ColumnProgessBox;

// const [contentInfo1,changeContentInfo1] = useState([
//   {
//     id: 1,
//     label: "Research",
//     projectTitle:
//       "    Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     projectSubTitle:
//       "Duis sit amet urna sed ante sodales commodo eu quis odio.",
//     date: "YYYY-MM-DD",
//   },
//   {
//     id: 2,
//     label: "Research",
//     projectTitle:
//       "Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
//     projectSubTitle:
//       "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
//     date: "1994-11-28",
//   },
//   {
//     id: 3,
//     label: "Research",
//     projectTitle: "Etiam ultricies diam eget rutrum vestibulum.",
//     projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
//     date: "1987-08-09, ",
//   },
//   {
//     id:4,
//     label: "Research",
//     projectTitle: "Etiam ultricies diam eget rutrum vestibulum.",
//     projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
//     date: "1987-08-09, ",
//   },
// ])

//  const onClick1 =(e)=>
//   {
//     console.log("dss");
//     const item = e;
//     console.log(item);
//     changeContentInfo([...contentInfo, item]);
//   }

// eslint-disable-next-line
// const onClickRemove = (e) => {
//   console.log("dss");
//   changeContentInfo((current) => current.filter((fruit) => fruit.id !== e));
// };

// import React from "react";
// import "./columnProgessBox.css";
// import AddIcon from "@mui/icons-material/Add";
// const ColumnProgessBox = ({
//   title,
//   contentInfo,
//   onClick,
//   changeContentInfo,
// }) => {

//   const onClickChange = (id) => {
//     var changeable_data = {
//       title: "",
//       id: 0,
//       label: "",
//       projectTitle: "",
//       projectSubTitle: "",
//       date: " ",
//     };
//     console.log("dss");
//     changeable_data = contentInfo.filter((element) => element.id === id);
//     console.log(changeable_data);
//     changeable_data[0].title="To Do";
//     console.log(changeable_data);
//     changeContentInfo((current) => current.filter((element) => element.id !== id));
//     console.log(contentInfo);
//     changeContentInfo([...contentInfo, changeable_data]);
//     console.log(contentInfo);
//   };
//   return (
//     <div className="columnProgessBox">
//       <Title
//         title={title}
//         onPressed={() => {
//           console.log("BackLog add button is pressed");
//         }}
//       />
//       {contentInfo.map((content) =>
//         content.title === title ? (
//           <Content
//             key={content.id}
//             {...content}
//             onClick={() => onClickChange(content.id)}
//           />
//         ) : (
//           ""
//         )
//       )}
//     </div>
//   );
// };
// const Title = ({ title, onPressed }) => {
//   return (
//     <div>
//       <div className="title">
//         <h5>{title}</h5>
//         <AddIcon onClick={onPressed} className="addIcon" />
//       </div>
//     </div>
//   );
// };
// const Content = ({
//   label,
//   projectTitle,
//   projectSubTitle,
//   date,
//   onClick,
//   onDoubleClick,
// }) => {
//   return (
//     <div className="content" onClick={onClick} onDrag={onDoubleClick}>
//       <div className="label">{label}</div>
//       <div className="projectTitle">{projectTitle}</div>
//       <div className="projectSubTitle">{projectSubTitle}</div>
//       <div className="datebox">{date}</div>
//     </div>
//   );
// };

// export default ColumnProgessBox;

// // const [contentInfo1,changeContentInfo1] = useState([
//   //   {
//   //     id: 1,
//   //     label: "Research",
//   //     projectTitle:
//   //       "    Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   //     projectSubTitle:
//   //       "Duis sit amet urna sed ante sodales commodo eu quis odio.",
//   //     date: "YYYY-MM-DD",
//   //   },
//   //   {
//   //     id: 2,
//   //     label: "Research",
//   //     projectTitle:
//   //       "Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
//   //     projectSubTitle:
//   //       "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
//   //     date: "1994-11-28",
//   //   },
//   //   {
//   //     id: 3,
//   //     label: "Research",
//   //     projectTitle: "Etiam ultricies diam eget rutrum vestibulum.",
//   //     projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
//   //     date: "1987-08-09, ",
//   //   },
//   //   {
//   //     id:4,
//   //     label: "Research",
//   //     projectTitle: "Etiam ultricies diam eget rutrum vestibulum.",
//   //     projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
//   //     date: "1987-08-09, ",
//   //   },
//   // ])

//   //  const onClick1 =(e)=>
//   //   {
//   //     console.log("dss");
//   //     const item = e;
//   //     console.log(item);
//   //     changeContentInfo([...contentInfo, item]);
//   //   }

//   // eslint-disable-next-line
//   // const onClickRemove = (e) => {
//   //   console.log("dss");
//   //   changeContentInfo((current) => current.filter((fruit) => fruit.id !== e));
//   // };
