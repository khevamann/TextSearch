import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./TextView.css";
import { Sentence } from "../../constants";

interface PropTypes {
  sentences: Array<Sentence>;
  chapter: number;
  bestChapter: number;
}

function TextView({ sentences, chapter, bestChapter }: PropTypes) {
  return (
    <div className="TextView_Container">
      <h2>Chapter {chapter === 0 ? bestChapter : chapter}</h2>
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
