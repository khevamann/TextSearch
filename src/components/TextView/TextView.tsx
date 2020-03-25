import React from "react";
import "./TextView.css";

interface PropTypes {
  text: string;
}

function TextView({ text }: PropTypes) {
  return (
    <div className="TextView_Container">
      <p>{text}</p>
    </div>
  );
}

export default TextView;
