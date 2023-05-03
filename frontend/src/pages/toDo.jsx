import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./toDo.css";
import TopToDoBar from "../component/topBar/topToDoBar";
import ColumnProgessBox from "../component/columnToDoBox/columnToDoBox.jsx";
import MemberListBox from "../component/memberListBox/memberListBox";
import Topbar from "../component/navBar/topbar";

import Popup from "reactjs-popup";
import { apiAddress } from "../component/API/api";
import { GetToken } from "../GlobalVariable";
import ErrorpopUp, { PositivepopUp } from "../component/popUp/ErrorpopUp";
import { ThreeCircles as Loading } from "react-loader-spinner";

const ToDoPage = () => {
  const location = useLocation();
  const [dataSet, setDataSet] = useState([]);
  const [id, setId] = useState(null);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [responseNameCode, setResponseNameCode] = useState(null);
  const [responseDataCode, setResponseCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMembers] = useState([]);
  const [isHead, setHead] = useState(false);
  const [selfID,setSelfID] = useState(null);
  let run = true;
  useEffect(() => {
    if (run == true) {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");
      setId(id);
      // console.log(id);
      const token = GetToken();
      setIsLoading(true);
      var isHead = true;
      async function FETCH() {
        const searchParams = new URLSearchParams(location.search);
        const Projectid = searchParams.get("id");
        try {
          const response = await fetch(
            `${apiAddress}project/iscreater/${Projectid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          if (response.status === 200) {
            setHead(result.flag);
          } else {
            // console.log(result.error);
            // setErrorMsg(result.error);
            // setOpenError((o) => !o);
          }
        } catch (e) {
          console.log(e);
        }
        try {
          const response = await fetch(
            `${apiAddress}project/getid`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          if (response.status === 200) {
          setSelfID(result.userid);
          } else {
            // console.log(result.error);
            // setErrorMsg(result.error);
            // setOpenError((o) => !o);
          }
        } catch (e) {
          console.log(e);
        }
      }
      FETCH();
      fetch(`${apiAddress}project/view/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setResponseCode(response.status);
          return response.json();
        })
        .then((data) => {
          for (let member of data.members) {
            const newData = { name: member.name, id: member._id };
            setMembers((prevData) => [...prevData, newData]);
          }
        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });
      fetch(`${apiAddress}todo/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setResponseCode(response.status);
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          for (let list of data[0].list) {
            const newData = {
              assignedto: list.assignedto._id,
              assignedtoName:list.assignedto.name,
              completedflag: list.completedflag,
              completedon: list.completedon,
              deadline: list.deadline,
              detail: list.detail,
              label: list.label,
              point: list.point,
              tag: list.tag,
              title: list.title,
              _id: list._id,
            };
            // console.log(newData);
            setDataSet((prevData) => [...prevData, newData]);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });

      setIsLoading(false);
      run = false;
    }
  }, []);

  const [contentInfo, changeContentInfo] = useState([
    {
      title: "BackLog",
      points: 10,
      id: 1,
      label: "Research",
      projectTitle:
        " BackLog Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      projectSubTitle:
        "Duis sit amet urna sed ante sodales commodo eu quis odio.",
      date: "YYYY-MM-DD",
    },
    {
      title: "BackLog",
      id: 2,
      label: "Research",
      projectTitle:
        "BackLog Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
      projectSubTitle:
        "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
      date: "1994-11-28",
    },
    {
      title: "BackLog",
      points: 10,
      id: 3,
      label: "Research",
      projectTitle: "BackLog Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09, ",
    },
    {
      title: "BackLog",
      points: 10,
      id: 4,
      label: "Research",
      projectTitle: "BackLog Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09, ",
    },

    {
      title: "To Do",
      points: 10,
      id: 5,
      label: "Research",
      projectTitle:
        " To Do  Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      projectSubTitle:
        "Duis sit amet urna sed ante sodales commodo eu quis odio.",
      date: "YYYY-MM-DD",
    },
    {
      title: "To Do",
      points: 10,

      id: 6,
      label: "Research",
      projectTitle:
        "To Do Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
      projectSubTitle:
        "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
      date: "1994-11-28",
    },
    {
      title: "To Do",
      points: 10,

      id: 7,
      label: "Research",
      projectTitle: "To Do Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },
    {
      title: "To Do",
      points: 10,

      id: 8,
      label: "Research",
      projectTitle: "To Do Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },

    {
      title: "In Progress",
      points: 10,

      id: 9,
      label: "Research",
      projectTitle:
        " In Progress   Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      projectSubTitle:
        "Duis sit amet urna sed ante sodales commodo eu quis odio.",
      date: "YYYY-MM-DD",
    },
    {
      title: "In Progress",
      points: 10,
      id: 10,
      label: "Research",
      projectTitle:
        "In Progress Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
      projectSubTitle:
        "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
      date: "1994-11-28",
    },
    {
      title: "In Progress",
      points: 10,

      id: 11,
      label: "In ProgressResearch",
      projectTitle: "Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },
    {
      title: "In Progress",
      points: 10,
      id: 12,
      label: "Research",
      projectTitle: "In Progress Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },

    {
      title: "Review",
      points: 10,
      id: 13,
      label: "Research",
      projectTitle:
        " Review   Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      projectSubTitle:
        "Duis sit amet urna sed ante sodales commodo eu quis odio.",
      date: "YYYY-MM-DD",
    },
    {
      title: "Review",
      points: 10,
      id: 14,
      label: "Research",
      projectTitle:
        " Review Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
      projectSubTitle:
        "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
      date: "1994-11-28",
    },
    {
      title: "Review",
      points: 10,
      id: 15,
      label: "Research",
      projectTitle: " Review Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },
    {
      title: "Review",
      points: 10,
      id: 16,
      label: "Research",
      projectTitle: " Review Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },
    {
      title: "Completed",
      points: 10,
      id: 17,
      label: "Research",
      projectTitle:
        " Completed   Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      projectSubTitle:
        "Duis sit amet urna sed ante sodales commodo eu quis odio.",
      date: "YYYY-MM-DD",
    },
    {
      title: "Completed",
      points: 10,
      id: 18,
      label: "Completed",
      projectTitle:
        " Completed Aenean iaculis nibh sed neque scelerisque, vel consequat risus ornare.",
      projectSubTitle:
        "Praesent sit amet sem eget justo lacinia vehicula eget et purus.",
      date: "1994-11-28",
    },
    {
      title: "Completed",
      points: 10,
      id: 19,
      label: "Research",
      projectTitle: " Completed Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },
    {
      title: "Completed",
      points: 10,
      id: 20,
      label: "Research",
      projectTitle: " Completed Etiam ultricies diam eget rutrum vestibulum.",
      projectSubTitle: "Etiam gravida quam id lacus pellentesque ultrices.",
      date: "1987-08-09",
    },
  ]);
  const [addPressed, ChangeAddPressed] = useState("False");
  return (
    <div>
      {/* { console.log(dataSet)} */}
      <Topbar />
      <div className="progressContainer">
        <div className="leftCointainer">
          <TopToDoBar />
          <div className="columns">
            <ColumnProgessBox selfID={selfID}
              isHead={isHead}
              membersList={member}
              onAddPressed={() => {
                ChangeAddPressed(true);
                console.log(addPressed);
              }}
              title={"BackLog"}
              contentInfo={dataSet}
              onClick={() => {
                console.log("prtessed");
              }}
              changeContentInfo={changeContentInfo}
            />
            <ColumnProgessBox
            selfID={selfID}
              isHead={isHead}
              membersList={member}
              title={"To Do"}
              contentInfo={dataSet}
              onClick={{}}
              changeContentInfo={changeContentInfo}
            />
            <ColumnProgessBox selfID={selfID}
              isHead={isHead}
              membersList={member}
              title={"In Progress"}
              contentInfo={dataSet}
              onClick={{}}
              changeContentInfo={changeContentInfo}
            />
            <ColumnProgessBox selfID={selfID}
              isHead={isHead}
              membersList={member}
              title={"Review"}
              contentInfo={dataSet}
              onClick={{}}
              changeContentInfo={changeContentInfo}
            />{" "}
            <ColumnProgessBox selfID={selfID}
              isHead={isHead}
              membersList={member}
              title={"Completed"}
              contentInfo={dataSet}
              onClick={{}}
              changeContentInfo={changeContentInfo}
            />
          </div>
        </div>
        <div className="rightCointainer">
          <MemberListBox />
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
