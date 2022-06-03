import React from "react";

function KeyBoard(props) {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  const allLetters = () => {
    // returns array of all guessed letters (includes duplicates)
    return props.allGuesses.slice(0, props.guessNumber).join("").split("");
  };

  const correctLetters = () => {
    // returns array of all letters guessed correctly (ie correct letter, correct position)
    return props.solution.split("").filter((l, i) => {
      return props.allGuesses
        .slice(0, props.guessNumber)
        .map((w) => w[i])
        .includes(l);
    });
  };

  const halfCorrectLetters = () => {
    // returns array of all letters guessed half-correctly (ie correct letter, incorrect position)
    return props.solution.split("").filter((l) => allLetters().includes(l));
  };

  const getKeyColour = (key) => {
    switch (true) {
      // if user guessed the correct letter & correct position, the key should be green
      case correctLetters().includes(key):
        return "key-green";
      // if user guessed the correct letter & incorrect position, the key should be yellow
      case halfCorrectLetters().includes(key):
        return "key-yellow";
      // if user guessed the incorrect letter & incorrect position, the key should be dark grey
      case allLetters().includes(key):
        return "key-dark";
      // if user hasn't guessed the letter yet, the key should be light grey
      default:
        return "key-default";
    }
  };

  return (
    <div className="keyboard-container">
      {rows.map((row) => (
        <div key={row} className="row-container">
          {row.split("").map((key) => {
            return (
              <button
                key={key}
                className={`key-letter ${getKeyColour(key)}`}
                onClick={() => props.handleTyping(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default KeyBoard;
