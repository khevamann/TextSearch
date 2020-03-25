import React, { ChangeEvent } from "react";
import "./SearchBar.css";
import { MIN_WORD_LENGTH } from "../../constants";

interface StateType {
  searchVal: string;
  words: Array<string>;
}
interface PropType {
  onWordChange(words: Array<string>): void;
}

class SearchBar extends React.Component<PropType> {
  state: StateType = {
    searchVal: "",
    words: [],
  };
  timer: number = 0;
  typewatch(callback: (e: string) => void, time: number, data: string) {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      callback(data);
    }, time);
  }

  handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchVal: value,
    });

    // typewatch() will wait 500 ms before triggering the onWordChange event to avoid searching every letter press
    this.typewatch(
      (value) => {
        let words: Array<string> = value.split(" ").filter((word) => {
          return word.length >= MIN_WORD_LENGTH;
        });
        words = Array.from(new Set(words));
        this.props.onWordChange(words);
      },
      500,
      value
    );
  }
  render() {
    const { searchVal } = this.state;
    return (
      <input
        className="SearchBar"
        type="text"
        value={searchVal}
        onChange={this.handleChange.bind(this)}
        onFocus={(event) => event.target.select()}
        placeholder="Search..."
      />
    );
  }
}

export default SearchBar;
