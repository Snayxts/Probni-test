import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [name, setName] = useState(getRandomName()); //POSTAVITI IME

  function getRandomName() {
    const adjs = ["Tom", "Jenny", "Lea", "Nick"];
    const nouns = ["Clank: ", "Ratchet: ", "Cooper: ", "Nion: "];
    return (
      adjs[Math.floor(Math.random() * adjs.length)] +
      " " +
      nouns[Math.floor(Math.random() * nouns.length)]
    );
  }

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  const texting = (event) => {
    setValue(event.target.value);
  };

  function stopIt(event) {
    event.preventDefault();
    setList([...list, value]);

    setValue("");
  }
  console.log(list);

  return (
    <div className="theDisplay">
      <form onSubmit={stopIt} className="botuniinput">
        <label>
          <input
            className="inputText"
            type="text"
            value={value}
            onChange={texting}
            placeholder="type"
          />
        </label>
        <button type="submit" className="botun" disabled={!value}>
          Sumbit
        </button>
      </form>

      {list.map((value, index) => (
        <div className="positioning" key={index}>
          <div className="position-messages">
            {name}
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
