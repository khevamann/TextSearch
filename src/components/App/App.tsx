import React from "react";
import "./App.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import TextView from "../TextView/TextView";
import { colors, WordObj } from "../../constants";
import { getChapterText } from "../../utils";

interface StateTypes {
  wordObjs: Array<WordObj>;
  chapter: number;
  chapterText: string;
}

class App extends React.Component {
  state: StateTypes = {
    wordObjs: [],
    chapter: 0,
    chapterText: "",
  };
  componentDidMount(): void {
    this.setState({ chapterText: getChapterText(1) });
  }

  updateWords(searchWords: Array<string>) {
    let wordObjs: Array<WordObj> = searchWords.map(
      (word: string, index: number) => ({
        color: colors[index % colors.length],
        word: word,
        enabled: true,
      })
    );
    this.setState({ wordObjs });
  }

  onChapterChange(index: number) {
    console.log("CHAP UPDATE");
    this.setState({ chapter: index, chapterText: getChapterText(index) });
  }

  toggleEnable(wordObj: WordObj): void {
    let { wordObjs } = this.state;
    wordObjs.map((word: WordObj) => {
      if (wordObj.word === word.word) {
        word.enabled = !word.enabled;
        return word;
      }
      return word;
    });
    this.setState({ wordObjs });
  }
  render() {
    const { wordObjs, chapterText } = this.state;
    return (
      <div className="App_Container">
        <Header
          onWordChange={this.updateWords.bind(this)}
          onChapterChange={this.onChapterChange.bind(this)}
        />
        <div className="App_Content">
          <SideBar
            wordObjs={wordObjs}
            toggleEnable={this.toggleEnable.bind(this)}
          />
          <TextView text={chapterText} />
        </div>
      </div>
    );
  }
}

export default App;
