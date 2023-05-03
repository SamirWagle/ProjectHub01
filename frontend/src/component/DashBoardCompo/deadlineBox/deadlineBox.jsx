import React from 'react'
import "./deadlineBox.css";

const DeadlineBox = ({date}) => {
  function getDateValues(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate(); 
    
    return `${year}-${month}-${day}`  ;
  }
  return (
    <div style={{display:"flex" ,color:"red"}}>
      Deadline : <div className="deadlinedatebox">{getDateValues(date)}</div>
    </div>
  )
}

export default DeadlineBox
