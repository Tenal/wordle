import React from "react";
import GuessRow from "./GuessRow";

function GuessesGrid(props) {
  const renderFullGrid = () => {
    return [...props.allGuesses].map((_, i) => {
      // if the guess is for the user's current turn, then use their current guess to fill in the guess row
      if (props.guessNumber === i) {
        return (
          <GuessRow
            key={i}
            solution={props.solution}
            hasGuessed={i < props.guessNumber}
            guess={props.currentGuess}
          />
        );
      }

      // otherwise, use the corresponding past guess to fill in the guess row
      return (
        <GuessRow
          key={i}
          solution={props.solution}
          hasGuessed={i < props.guessNumber}
          guess={props.allGuesses[i]}
        />
      );
    });
  };

  return <div className="guesses-container">{renderFullGrid()}</div>;
}

export default GuessesGrid;
