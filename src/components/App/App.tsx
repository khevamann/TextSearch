import React from "react";
import "./App.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import TextView from "../TextView/TextView";
import { colors, WordObj } from "../../constants";

interface StateTypes {
  wordObjs: Array<WordObj>;
}

class App extends React.Component {
  state: StateTypes = {
    wordObjs: [],
  };

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
    const { wordObjs } = this.state;
    return (
      <div className="App_Container">
        <Header onWordChange={this.updateWords.bind(this)} />
        <div className="App_Content">
          <SideBar
            wordObjs={wordObjs}
            toggleEnable={this.toggleEnable.bind(this)}
          />
          <TextView />
        </div>
      </div>
    );
  }
}

export default App;
