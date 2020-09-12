import React, { useState, useEffect } from "react";
import "./App.css";
import getRandomName from "./components/Helpers";
import { randomColor } from "./components/Helpers";
import Input from "./components/Input";
import Messages from "./components/Messages";

export default function App() {
  const [user, setUser] = useState({
    username: getRandomName(),
    color: randomColor(),
  });

  const [drone, setDrone] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const drone = new window.Scaledrone("sZFRqKzjbnaVolJP", {
      data: user,
    });
    setDrone(drone);
    // eslint-disable-next-line
  }, []);

  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log(user.username + " connected to scaledrone!");

      user.id = drone.clientId;
      setUser({ ...user });

      const room = drone.subscribe("observable-room");

      room.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        console.log(user.username + " joined room");
      });

      room.on("data", (text, user) => {
        messages.push({ user, text });
        setMessages([...messages]);
      });
    });
  }

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div>
      <div className="header">
        <div className="header-text">Chat App</div>
      </div>
      <div className="theDisplay">
        <Messages
          messages={messages}
          currentUser={user}
          style={{ color: user.color }}
        />
        <Input onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
