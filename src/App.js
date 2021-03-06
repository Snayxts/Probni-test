import React, { useState, useEffect } from "react";

import {
  getRandomName,
  randomColor,
  Input,
  Messages,
} from "./components/Index";

import "./App.css";

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
        let time = new Date().toLocaleTimeString();
        messages.push({ user, text, time });
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
          style={{ color: user.color }}
          currentUser={user}
        />

        <Input onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
