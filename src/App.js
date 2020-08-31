import React, { useState } from "react";
import "./App.css";
import getRandomName from "./components/Helpers";
import { randomColor } from "./components/Helpers";

export default function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [name, setName] = useState(getRandomName());
  const [color, setColor] = useState(randomColor());

  const texting = (event) => {
    setValue(event.target.value);
  };

  function stopIt(event) {
    event.preventDefault();
    setList([...list, name + value]);

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
          {/* dodao COLOR, kasnije vj izmjeniti, trenutacno testiram jeli sve radi ok */}
          <div className="position-messages" style={{ color: color }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
