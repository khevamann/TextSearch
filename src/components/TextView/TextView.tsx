import React from "react";
import {getAllTexts} from "../../utils";
import "./TextView.css";

function TextView() {

  return (
    <div className="TextView_Container">
      <p>{getAllTexts()}</p>
    </div>
  );
}

export default TextView;
