import React, { useState, useEffect } from "react";
import "./deadline.css";
import  Topbar from "../component/navBar/topbar";

function DigitalTimer({ deadline }) {
  // const [days, setDays] = useState(deadline.daysLeft);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  const [days, setDays] = useState(deadline.daysLeft);
  const [hours, setHours] = useState(deadline.hoursLeft);
  const [minutes, setMinutes] = useState(deadline.minutesLeft);
  const [seconds, setSeconds] = useState(deadline.secondsLeft);
  // console.log(deadline.hoursLeft,)
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === -1) {
      setSeconds(59);
      setMinutes((minutes) => minutes - 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === -1) {
      setMinutes(59);
      setHours((hours) => hours - 1);
    }
  }, [minutes]);

  useEffect(() => {
    if (hours === -1) {
      setHours(23);
      setDays((days) => days - 1);
    }
  }, [hours]);

  return (
    <div className="digital-timer">
      <div className="digits">
        <div className="digit">
          <span>{days.toString().padStart(2, "0")}</span>
          <span>Days</span>
        </div>
      </div>
      <br></br>
      <div className="digits">
        <div className="digit">
          <span>{hours.toString().padStart(2, "0")}</span>
          <span>Hours</span>
        </div>
        <div className="digit">
          <span>{minutes.toString().padStart(2, "0")}</span>
          <span>Minutes</span>
        </div>
        <div className="digit">
          <span>{seconds.toString().padStart(2, "0")}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
}

const DeadlineList = () => {
  // function handleDelete(index) {}
  const deadlines = [
    {
      id: 1,
      deadline: new Date(2023, 6, 28),
      title: "Deadline Title 1",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 2,
      deadline: new Date(2023, 7, 10),
      title: "Deadline Title 2",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 2,
      deadline: new Date(2023, 8, 21),
      title: "Deadline Title 3",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 3,
      deadline: new Date(2023, 9, 9),
      title: "Deadline Title 4",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 4,
      deadline: new Date(2023, 10, 8),
      title: "Deadline Title 5",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 5,
      deadline: new Date(2023, 11, 6),
      title: "Deadline Title 6",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 6,
      deadline: new Date(2023, 12, 4),
      title: "Deadline Title 7",
      describtion: "xdvfgvdfgdfg",
    },
    {
      id: 7,
      deadline: new Date(2023, 12, 4),
      title: "Deadline Title 8",
      describtion: "xdvfgvdfgdfg",
    },
  ];
  function TopicLabel(Labelname) {
    return (
      <div className="topicLabelContainer">
        <div
          style={{
            background: "rgb(111, 86, 86)",
            height: "10px",
            width: "100px",
          }}
        ></div>
        <div className="topicLabel">{Labelname}</div>{" "}
        <div
          style={{
            background: "rgb(111, 86, 86)",
            height: "10px",
            width: "100px",
          }}
        ></div>
      </div>
    );
  }
  function calculateTimeLeft(deadline) {
    const timeDiff = Date.parse(deadline) - Date.now();
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24) - 30);
    const hoursLeft = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((timeDiff / 1000) % 60);

    return { daysLeft, hoursLeft, minutesLeft, secondsLeft };
  }
  // style={{background:"whitesmoke"}}
  return (
    <div className="deadlineContainers">
      <Topbar />
      {TopicLabel("FINAL SUBMISSION")}
      <div className="finalSubmissiontimer">
        <DigitalTimer deadline={calculateTimeLeft(new Date(2023, 6, 28))} />
      </div>

      {TopicLabel("OTHER SUBMISSION")}
      <div className="deadline-card-container">
        {deadlines.map((deadline) => (
          <DeadlineCards key={deadline.id} {...deadline} />
        ))}
      </div>
    </div>
  );
};
const DeadlineCards = ({ deadline, title, describtion }) => {
  console.log(title, describtion);
  function calculateTimeLeft(deadline) {
    const timeDiff = Date.parse(deadline) - Date.now();
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24) - 30);
    const hoursLeft = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((timeDiff / 1000) % 60);

    return { daysLeft, hoursLeft, minutesLeft, secondsLeft };
  }
  return (
    <div className="deadline-card">
      <DigitalTimer deadline={calculateTimeLeft(deadline)} />
      <h5>{title}</h5>
      <p> {describtion}</p>
    </div>
  );
};
export default DeadlineList;
