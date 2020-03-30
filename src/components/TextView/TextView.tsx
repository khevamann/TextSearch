import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./TextView.css";
import { Sentence } from "../../constants";

interface PropTypes {
  sentences: Array<Sentence>;
}

function TextView({ sentences }: PropTypes) {
  return (
    <div className="TextView_Container">
      <p>
        {ReactHtmlParser(
          sentences
            .map((obj) => `<span id="sentence_${obj.index}">${obj.text}</span>`)
            .join(".")
        )}
      </p>
    </div>
  );
}

export default TextView;
