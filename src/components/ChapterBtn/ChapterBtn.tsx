import React from "react";
import "./ChapterBtn.css";

interface PropType {
  index: number;
  selected: boolean;
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
    const { index, selected } = this.props;
    return (
      <div
        className={`Button ${selected ? "Button_Selected" : ""}`}
        onClick={this.chapSelected.bind(this)}
      >
        Chapter {index}
      </div>
    );
  }
}

export default ChapterBtn;
