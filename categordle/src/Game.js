import './App.css';
import React, { useState, useEffect } from 'react';
import * as util from "util";
const w2v = require('word2vec');


function useWords() {
  const [words, setWords] = useState([]);
  useEffect(() => import('./words.json').then((m) => setWords(m.default)), []);

  console.log(words);

  const answerIndex = getAnswerIndex();
  return {
    answer: words[answerIndex] || '',
    answerIndex,
    isGuessValid: (guess) => words.includes(guess),
  };
}

//TODO: generate random answer word
const getAnswerIndex = () => Math.floor(Math.random() * 4);
  // Math.floor(
  //   (Date.now() - new Date(2022, 0, 23, 0, 0, 0).getTime()) / 86400e3
  // ) % NUM_ANSWERS;

const loadModelPromise = util.promisify(w2v.loadModel);

function findMatches(theme) {
  let toReturn = [];
  loadModelPromise('./config/wordvecs.txt').then((model) => {
    const similarWords = model.mostSimilar(theme, 15);
    for (let wordPair of similarWords) {
      const word = wordPair['word'].toLowerCase();
      if (toReturn.length === 6) { //Once we have enough words, we can stop early
        break;
      }
      if (word.includes(theme)) { //We'll toss out any words that are too similar
        continue;
      }
      let matchesExisting = false;
      for (let existingWord of toReturn) { //But clues also shouldn't be too similar to each other
        if (existingWord.includes(word) || word.includes(existingWord)) {
          matchesExisting = true;
          break;
        }
      }
      if (matchesExisting) {
        continue;
      }
      toReturn.push(word);
    }
    toReturn.reverse(); //Our clues should be in reverse order!
    return toReturn;
  });
}

export default function Game() {
  const { answer, answerIndex, isGuessValid } = useWords();

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}
