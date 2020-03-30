import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import ChapterBtn from "../ChapterBtn/ChapterBtn";
import { NUM_CHAPTERS } from "../../constants";

interface PropType {
  onWordChange(words: Array<string>): void;
  onChapterChange(index: number): void;
  bestChap: number;
  chapMatches: Array<number>;
}

class Header extends React.Component<PropType> {
  state = {
    selected: 0,
    chapMatches: [],
    bestChap: -1,
  };
  handleSelection(index: number) {
    this.setState({ selected: index });
    this.props.onChapterChange(index);
  }
  render() {
    const { onWordChange, bestChap, chapMatches } = this.props;
    const { selected } = this.state;
    return (
      <div className="Header_Container">
        <SearchBar onWordChange={onWordChange} />
        <div className="Header_Buttons">
          <ChapterBtn
            index={0}
            chapterNum={bestChap}
            selected={selected === 0}
            onChapSelected={this.handleSelection.bind(this)}
          />
          {Array.from(Array(NUM_CHAPTERS)).map((data, index) => (
            <ChapterBtn
              key={index}
              index={index + 1}
              matchNumber={chapMatches[index]}
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
