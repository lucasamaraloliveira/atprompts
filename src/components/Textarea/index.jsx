import React, { useState } from "react";
import "./Textarea.css";

const TextArea = (props) => {
  const [text, setText] = useState(props.text);

  const handleCopy = () => {
    /* Get the text field */
    const copyText = props.textareaRef.current;

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Prompt copiado com sucesso! ");
  };

  return (
    <div className="textarea-config">
      <textarea
        name=""
        id=""
        cols="95"
        rows="9"
        onChange={(e) => setText(e.target.value)}
        value={text}
        ref={props.textareaRef}
        
      ></textarea>
      <button onClick={handleCopy}>Copiar prompt</button>
    </div>
  );
};

export default TextArea;
