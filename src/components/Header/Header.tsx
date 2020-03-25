import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import ChapterBtn from "../ChapterBtn/ChapterBtn";
import { NUM_CHAPTERS } from "../../constants";

interface PropType {
  onWordChange(words: Array<string>): void;
}

class Header extends React.Component<PropType> {
  state = {
    selected: 0,
  };
  handleSelection(index: number) {
    console.log(`Chapter ${index} selected`);
    this.setState({selected: index})
  }
  render() {
    const { onWordChange } = this.props;
    const { selected } = this.state;
    return (
      <div className="Header_Container">
        <SearchBar onWordChange={onWordChange} />
        <div className="Header_Buttons">
          {Array.from(Array(NUM_CHAPTERS + 1)).map((data, index) => (
            <ChapterBtn
              value={index}
              selected={selected === index}
              onChapSelected={(() => this.handleSelection(index))}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Header;
