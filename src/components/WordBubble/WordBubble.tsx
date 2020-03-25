import React from "react";
import "./WordBubble.css";

interface Props {
  wordObj: {
    color: string;
    word: string;
    enabled: boolean;
  };
  toggleEnable(): void
}

class WordBubble extends React.Component<Props> {
  state = {
    enabled: this.props.wordObj.enabled,
  };
  generateStyle() {
    const {
      wordObj: { enabled, color },
    } = this.props;
    if (enabled) return { backgroundColor: color, borderColor: '#ddd', };
    return { color: '#000', borderColor: color, opacity: '50%'};
  }

  render() {
    const {
      wordObj: { word },
      toggleEnable,
    } = this.props;
    return (
      <div
        className="WordBubble"
        style={this.generateStyle()}
        onClick={toggleEnable}
      >
        {word}
      </div>
    );
  }
}

export default WordBubble;
