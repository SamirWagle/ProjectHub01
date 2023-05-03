import React from "react";
import "./chatpage.css";
import Chatelement from "../component/chatelement/chatelement";
import Topbar from "../component/navBar/topbar";
import MemberListBox from "../component/memberListBox/memberListBox";
const Chatpage = () => {
  const msgList=[{
    id:1,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },{
    id:3,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },{
    id:4,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },{
    id:5,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },{
    id:6,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },{
    id:7,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },{
    id:9,
    sender:"Ramesh",
    messege:"Hello",
    isSelfSender:false,
  },
]
  return (
    <div class="chatpage">
      <Topbar />
      <div className="Chat_Division">
      <div className="ChatSection">
        <h1 class="chattitle">Discussion</h1>
        <hr id="chatdivider" />
        <div class="chat-container">
          <div class="chatpagechats">
          {
            msgList.map((msg)=>
            <Chatelement key={msg.id } {...msg}/>)
          }
            <Chatelement sender="Ramesh" messege="Hello" />
            <Chatelement sender="Ramesh" messege="Test 1" />
            <Chatelement sender="Ramesh" messege="Hello" />
            <Chatelement sender="Ramesh" messege="Hello" />
          </div>
          <div class="chatinput">
            <input type="text" placeholder="Type your message..."  />
          </div>
        </div>
      </div>
        
        <MemberListBox />
      </div>
    </div>
  );
};

export default Chatpage;
