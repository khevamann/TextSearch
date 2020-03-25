import React from "react";
import "./SideBar.css";
import { WordObj } from "../../constants";
import WordBubble from "../WordBubble/WordBubble";

interface PropTypes {
  wordObjs: Array<WordObj>;
  toggleEnable(wordObj: WordObj): void;
}

class SideBar extends React.Component<PropTypes> {
  render() {
    const { wordObjs, toggleEnable } = this.props;
    return (
      <>
        {wordObjs.length > 0 && (
          <div className="SideBar_Container">
            <p className="SideBar_ToggleWordMsg">
              Select words to remove from search:
            </p>
            <div className="SideBar_ColorContainer">
              {wordObjs.map((wordObj: WordObj) => (
                <WordBubble
                  key={wordObj.color}
                  wordObj={wordObj}
                  toggleEnable={() => toggleEnable(wordObj)}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SideBar;
