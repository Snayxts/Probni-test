import React, { useState } from "react";

export default function Input(props) {
  const [value, setValue] = useState("");

  const ChangeText = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue("");
    props.onSendMessage(value);
  };

  return (
    <div className="botuniinput">
      <form onSubmit={onSubmit} className="input-botun">
        <input
          className="input"
          type="text"
          placeholder="Type here"
          onChange={ChangeText}
          value={value}
        />
        <button disabled={!value}>Sumbit</button>
      </form>
    </div>
  );
}
