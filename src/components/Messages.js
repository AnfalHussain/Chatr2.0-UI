import React from "react";
import moment from "moment";
import "../assets/css/main.css";
import profileIcon from "../assets/images/profile2.png";

const Messages = props => {
  return (
    <div id="bubbles">
      <img src={profileIcon} alt="Avatar" className="image"></img>
      <span className="username">
        <b> {props.messages.username} </b>
      </span>
      <div className="messages">
        <p>{props.messages.message}</p>
      </div>
      <span className="timestamp">
        {moment(props.messages.timestamp).calendar()}
      </span>
    </div>
  );
};

export default Messages;
