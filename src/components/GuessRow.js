import React from "react";

function GuessRow(props) {
  const { solution, hasGuessed, guess } = props;

  const getBoxColour = (i) => {
    switch (true) {
      // if user hasn't guessed yet (ie is still typing), the box should be black
      case !hasGuessed:
        return "black-box";
      // if user guessed the correct letter & correct position, the box should be green
      case guess[i] === solution[i]:
        return "green-box";
      // if user guessed the correct letter & incorrect position, the box should be yellow
      case solution.includes(guess[i]):
        return "yellow-box";
      // if user guessed the incorrect letter & incorrect position, the box should be grey
      default:
        return "grey-box";
    }
  };

  const renderLineOfBoxes = () => {
    const numberOfBoxes = 5;
    return [...Array(numberOfBoxes)].map((_, i) => (
      <div key={i} className={`letter-box ${getBoxColour(i)}`}>
        {guess[i]}
      </div>
    ));
  };

  return <div className="guess">{renderLineOfBoxes()}</div>;
}

export default GuessRow;
