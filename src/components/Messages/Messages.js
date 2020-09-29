import React, { useEffect, useRef } from "react";
import "./Messages.css";

export default function Messages(props) {
  const { messages } = props;

  //Automatic scroll down
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  //Show current date
  const showDate = () => {
    let today = new Date(),
      date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    return date;
  };

  return (
    <div className="Messages-list">
      <div className="showDate">{showDate()}</div>

      {messages.map((m, index) => renderMessage(m, index))}

      <div ref={messagesEndRef} />
    </div>
  );

  function renderMessage(message, index) {
    const { user, text, time } = message;
    const { currentUser } = props;
    const messageFromMe = user.id === currentUser.id;
    const className = messageFromMe
      ? "Messages-message currentUser"
      : "Messages-message";

    return (
      <div key={index} className={className}>
        <div className="Message-content">
          <div>{user.clientData.username}</div>
          <div
            className="text"
            style={{ backgroundColor: user.clientData.color }}
          >
            {text}
          </div>
          {time}
        </div>
      </div>
    );
  }
}
