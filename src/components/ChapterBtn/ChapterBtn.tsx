import React from "react";
import "./ChapterBtn.css";

interface StateType {
  searchVal: string;
  words: Array<string>;
}
interface PropType {
  value: number;
  selected: boolean;
  onChapSelected(index: number): void;
}

class ChapterBtn extends React.Component<PropType> {
  render() {
    const { value, onChapSelected } = this.props;
    return (
      <div classNames={[(value === 0)? "Button": ""]} onClick={() => onChapSelected}>
        {value === 0 ? `All Chapters` : `Chapter ${value}`}
      </div>
    );
  }
}

export default ChapterBtn;
