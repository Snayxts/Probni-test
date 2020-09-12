import React, { useEffect, useRef } from "react";

export default function Messages(props) {
  const { messages } = props;

  //scroll down automatic
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="Messages-list">
      {messages.map((m, index) => renderMessage(m, index))}
      <div ref={messagesEndRef} />
    </div>
  );

  function renderMessage(message, index) {
    const { user, text } = message;
    const { currentUser } = props;
    const messageFromMe = user.id === currentUser.id;
    const className = messageFromMe
      ? "Messages-message currentUser"
      : "Messages-message";

    return (
      <div key={index} className={className}>
        <div className="Message-content">
          <div className="username">{user.clientData.username}</div>
          <div
            className="text"
            style={{ backgroundColor: user.clientData.color }}
          >
            {text}
          </div>
        </div>
      </div>
    );
  }
}
Messages.defaultProps = {
  message: "",
  username: "",
};
