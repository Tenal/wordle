import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import words from "./data/words.json";
import NavBar from "./components/NavBar.js";
import GuessesGrid from "./components/GuessesGrid.js";
import KeyBoard from "./components/KeyBoard.js";

function App() {
  const [solution, setSolution] = useState(null);
  const [allGuesses, setAllGuesses] = useState(["", "", "", "", "", ""]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessNumber, setGuessNumber] = useState(0);
  const [guessMessage, setGuessMessage] = useState(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  const userWon = () => {
    return currentGuess === solution;
  };

  const userLost = () => {
    return guessNumber === 5;
  };

  const isGameOver = () => {
    if (userWon()) {
      setGuessedCorrectly(true);
      setGuessMessage(`congratulations! the word was ${solution}`);
      return;
    }
    if (userLost()) {
      setGuessMessage(`better luck next time! the word was ${solution}`);
      return;
    }
  };

  const submitGuess = () => {
    // if word is less than 5 letters, do not submit
    if (currentGuess.length !== 5) {
      setGuessMessage("word must be 5 letters");
      setTimeout(() => {
        setGuessMessage(null);
      }, 2500);
      return;
    }

    // if user has already guessed word, do not submit
    if (allGuesses.includes(currentGuess)) {
      setGuessMessage("word already guessed");
      setTimeout(() => {
        setGuessMessage(null);
      }, 2500);
      return;
    }

    // if word is not acceptable word (ie if it's not in our DB), do not submit
    if (!words.includes(currentGuess)) {
      setGuessMessage("not a guessable word");
      setTimeout(() => {
        setGuessMessage(null);
      }, 2500);
      return;
    }

    // else, submit guess (add to guessed words, update guess count, and reset current guess)
    const updatedGuessAttempts = [...allGuesses];
    updatedGuessAttempts[guessNumber] = currentGuess;
    setAllGuesses(updatedGuessAttempts);
    setGuessNumber((prev) => {
      return (prev += 1);
    });
    setCurrentGuess("");

    // check if user has won or lost
    isGameOver();
  };

  const handleTyping = (keyVal) => {
    // if key val is a string (ie passed in from the artificial keyboard click) use it as is
    // if the key val is not a strong (ie passed in from a key press event) use the key field on the event object
    const key = typeof keyVal === "string" ? keyVal : keyVal.key;

    // if user has already guessed word correctly, do not type letters
    if (guessedCorrectly) {
      return;
    }

    // if user hits enter, submit their current guess
    if (key === "Enter") {
      submitGuess();
      return;
    }

    // if user hits backspace, remove the previous letter
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    // if user hits a letter, add that letter (as long as it doesn't exceed 5 letters)
    if (key.match(/^[A-z]$/) && currentGuess.length < 5) {
      setCurrentGuess((prev) => {
        return prev + key.toLowerCase();
      });
    }
  };

  const dailyWordUpdate = () => {
    // NOTE: this function goes through the words array in order (ie the word won't be random)
    const today = new Date();
    const daysinMs = today.getTime() / (1000 * 60 * 60 * 24);
    const index = Math.floor(daysinMs) % words.length;
    setSolution(words[index]);
  };

  useEffect(() => {
    dailyWordUpdate();
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleTyping);
    return () => window.removeEventListener("keyup", handleTyping);
  }, [handleTyping]);

  return (
    solution && (
      <div className="general-layout">
        <header>
          <NavBar />
        </header>

        <div className="body-container">
          {guessMessage && (
            <div className="message-container">
              <p>{guessMessage}</p>
            </div>
          )}

          <GuessesGrid
            solution={solution}
            currentGuess={currentGuess}
            allGuesses={allGuesses}
            guessNumber={guessNumber}
          />

          {solution && (
            <KeyBoard
              solution={solution}
              allGuesses={allGuesses}
              guessNumber={guessNumber}
              handleTyping={handleTyping}
            />
          )}

          <div>{}</div>
        </div>
      </div>
    )
  );
}

export default App;
