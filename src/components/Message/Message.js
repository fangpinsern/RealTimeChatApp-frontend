import React from "react";
import "./Message.css";

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const formattedName = name.trim().toLowerCase();

  if (message.user === formattedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{formattedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.text}</p>
      </div>
      <p className="sentText">{message.user}</p>
    </div>
  );
};

export default Message;
