import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default function Input(props) {
  const [value, setValue] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const ChangeText = (event) => {
    setValue(event.target.value);
  };

  // EMOJIS
  const showEmojis2 = () => {
    if (showEmojis === false) {
      return setShowEmojis(true);
    } else if (showEmojis === true) {
      return setShowEmojis(false);
    }
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setValue(value + emoji);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue("");
    setShowEmojis(false);
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
        <button className="botun-botun" disabled={!value}>
          Sumbit
        </button>
      </form>

      <span>
        <button className="showandclosebotun" onClick={showEmojis2}>
          {String.fromCodePoint(0x1f60a)}
        </button>

        {showEmojis && (
          <span className="getEmojiButton">
            <Picker onSelect={addEmoji} />
          </span>
        )}
      </span>
    </div>
  );
}
