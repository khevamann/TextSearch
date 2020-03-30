import React from "react";
import "./App.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import TextView from "../TextView/TextView";
import {
  colors,
  NUM_SENTENCES,
  Sentence,
  SentenceScore,
} from "../../constants";
import {
  calculateScore,
  getChapterSentences,
  getChapterText,
} from "../../utils";

interface StateTypes {
  wordObjs: any;
  chapter: number;
  sentences: Array<Sentence>;
  currSentence: number;
}

class App extends React.Component {
  state: StateTypes = {
    sentences: [],
    wordObjs: {},
    chapter: 1,
    currSentence: -1,
  };
  componentDidMount(): void {
    this.setState({ sentences: getChapterSentences(1) });
  }

  updateWords(searchWords: Array<string>) {
    let wordObjs: any = {};

    searchWords.forEach((word: string, index: number) => {
      let newWord = word.toLowerCase().replace(/[^\w\s]/g, "");
      wordObjs[newWord] = {
        color: colors[index % colors.length],
        word: newWord,
        enabled: true,
      };
    });

    this.setState({ wordObjs });

    this.runSearch();
  }

  runSearch(chapterNum?: number) {
    let { wordObjs, chapter } = this.state;
    chapter = chapterNum || chapter;

    let sentCount: Array<Sentence> = getChapterText(chapter).map(
      (value: string, sentIndex: number) => {
        let currScore: SentenceScore = {
          count: 0,
          uniqueCount: 0,
          length: value.length,
        };
        let uniqueWords: any = {};

        // Loop through words in each sentence
        let valueArr = value.split(" ").map((word: string) => {
          let wordComp = word.toLowerCase().replace(/[^\w\s]/g, "");
          if (wordObjs[wordComp] && wordObjs[wordComp].enabled) {
            //Handle sentence scoring
            if (!uniqueWords[wordComp]) {
              currScore.uniqueCount++;
              uniqueWords[wordComp] = true;
            }
            currScore.count++;

            // Return a formatted string to make it easier to spot words in TextView
            return `<strong style="color: white; background-color: ${wordObjs[wordComp].color}">${word}</strong>`;
          }
          return word;
        });

        //Current scoring function
        let score = calculateScore(currScore);

        return {
          text: valueArr.join(" "),
          index: sentIndex,
          score,
        };
      }
    );
    this.setState({ sentences: sentCount });
  }

  getTopSentences(numSent: number) {
    const { sentences } = this.state;
    const newSents = [...sentences];

    return newSents
      .sort((a: Sentence, b: Sentence) => b.score - a.score)
      .slice(0, numSent);
  }

  scrollTo(sentNumber: number) {
    let { currSentence } = this.state;
    if (currSentence >= 0) {
      let span = document.getElementById(`sentence_${currSentence}`);
      if (span != null) {
        span.style.border = "none";
      }
    }
    let span = document.getElementById(`sentence_${sentNumber}`);
    let parent = document.getElementsByClassName("TextView_Container")[0];
    if (span === null) return false;
    // get parent position
    let parentRect = parent.getBoundingClientRect();
    let parentViewableArea = {
      height: parent.clientHeight,
      width: parent.clientWidth,
    };

    // Where is the span
    let spanRect = span.getBoundingClientRect();
    // Is the span viewable?
    let isViewable =
      spanRect.top >= parentRect.top &&
      spanRect.bottom <= parentRect.top + parentViewableArea.height;

    // if you can't see the span try to scroll parent
    if (!isViewable) {
      // scroll by offset relative to parent
      parent.scrollTop =
        spanRect.top +
        parent.scrollTop -
        parentRect.top / 2 -
        parentViewableArea.height / 2;
    }

    span.style.border = "2px solid red";

    this.setState({ currSentence: sentNumber });
  }

  onChapterChange(index: number) {
    this.setState({ chapter: index });
    this.runSearch(index);
  }

  toggleEnable(wordObj: any): void {
    let { wordObjs } = this.state;
    wordObjs[wordObj.word].enabled = !wordObjs[wordObj.word].enabled;

    this.setState({ wordObjs });

    this.runSearch();
  }
  render() {
    const { wordObjs, sentences } = this.state;
    return (
      <div className="App_Container">
        <Header
          onWordChange={this.updateWords.bind(this)}
          onChapterChange={this.onChapterChange.bind(this)}
        />
        <div className="App_Content">
          <SideBar
            wordObjs={wordObjs}
            topSentences={this.getTopSentences(NUM_SENTENCES)}
            toggleEnable={this.toggleEnable.bind(this)}
            scrollTo={this.scrollTo.bind(this)}
          />
          <TextView sentences={sentences} />
        </div>
      </div>
    );
  }
}

export default App;
