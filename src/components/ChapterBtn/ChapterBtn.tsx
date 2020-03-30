import React from "react";
import "./ChapterBtn.css";

interface PropType {
  index: number;
  selected: boolean;
  matchNumber?: number;
  chapterNum?: number;
  onChapSelected(index: number): void;
}

class ChapterBtn extends React.Component<PropType> {
  chapSelected() {
    const { index, onChapSelected, selected } = this.props;
    if (!selected) {
      onChapSelected(index);
    }
  }

  render() {
    const { index, selected, matchNumber, chapterNum } = this.props;
    return (
      <>
        {index === 0 ? (
          <div
            className={`Button Button_Best ${selected ? "Button_Selected" : ""}`}
            onClick={this.chapSelected.bind(this)}
          >
            Best Chapter
            {chapterNum && chapterNum >= 0 && (
              <p className="Button_Matches">Chapter {chapterNum}</p>
            )}
          </div>
        ) : (
          <div
            className={`Button ${selected ? "Button_Selected" : ""}`}
            onClick={this.chapSelected.bind(this)}
          >
            Chapter {index}
            {matchNumber !== undefined && (
              <p className="Button_Matches">{matchNumber} matches</p>
            )}
          </div>
        )}
      </>
    );
  }
}

export default ChapterBtn;
