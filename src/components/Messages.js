import React from "react";

export default function Messages(props) {
  const { messages } = props;

  return (
    <div className="Messages-list">
      {messages.map((m, index) => renderMessage(m, index))}
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
