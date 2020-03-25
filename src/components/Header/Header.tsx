import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import ChapterBtn from "../ChapterBtn/ChapterBtn";
import { NUM_CHAPTERS } from "../../constants";

interface PropType {
  onWordChange(words: Array<string>): void;
  onChapterChange(index: number): void;
}

class Header extends React.Component<PropType> {
  state = {
    selected: 1,
  };
  handleSelection(index: number) {
    this.setState({ selected: index });
    this.props.onChapterChange(index)
  }
  render() {
    const { onWordChange } = this.props;
    const { selected } = this.state;
    return (
      <div className="Header_Container">
        <SearchBar onWordChange={onWordChange} />
        <div className="Header_Buttons">
          {Array.from(Array(NUM_CHAPTERS)).map((data, index) => (
            <ChapterBtn
              key={index}
              index={index + 1}
              selected={selected === index + 1}
              onChapSelected={this.handleSelection.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Header;
