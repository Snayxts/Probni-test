import React, { useState } from "react";
import "./App.css";

export default function App() {
  const CLIENT_ID = "1MOSLJAQfNkm8NXq";

  const drone = new window.ScaleDrone(CLIENT_ID, {
    data: {
      // Will be sent out as clientData via events
      name: getRandomName(),
      color: getRandomColor(),
    },
  });

  drone.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Successfully connected to Scaledrone");

    const room = drone.subscribe("observable-semrad");

    room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully joined room");
    });

    room.on("data", (text, member) => {
      if (member) {
        setStore([text, member]);
      } else {
        // Message is from server
      }
    });
  });

  drone.on("close", (event) => {
    console.log("Connection was closed", event);
  });

  drone.on("error", (error) => {
    console.error(error);
  });

  function sendMessage() {
    //VAMO KREIRAT STATE i SETSTATE (kreirati text value vamo) u reactu
    const value = input.value;
    if (value === "") {
      return;
    }
    console.log(value);

    input.value = "";
    drone.publish({
      room: "observable-semrad",
      message: value,
    });
  }

  function getRandomName() {
    const adjs = ["autumn", "hidden", "bitter", "YIKI", "hula"];
    const nouns = ["Sekki", "Onao", "jjjwf", "sf", "Miki", "Ki2"];
    return (
      adjs[Math.floor(Math.random() * adjs.length)] +
      "_" +
      nouns[Math.floor(Math.random() * nouns.length)]
    );
  }

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  const [input, setInput] = useState("");
  const [store, setStore] = useState([]);
  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSumbit = (event) => {
    event.preventDefault();
    setInput("");
  };

  console.log(input);
  return (
    <div>
      <form onSubmit={onSumbit}>
        <input
          type="text"
          placeholder="message"
          onChange={onChange}
          value={input}
        />
        <button disabled={!input}>Sumbit</button>
      </form>
    </div>
  );
}
