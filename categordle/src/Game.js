import './App.css';
import React, { useState, useEffect } from 'react';
import * as util from "util";
const w2v = require('word2vec');

export default function Game() {
    const [words, setWords] = useState([]);
    const [answer, setAnswer] = useState([]);
    useEffect(() => import('./words.json').then((m) => setWords(m.default)), []);
    useEffect(() => setAnswer(words[getAnswerIndex()]), [words])
    const allWordMatches = findMatches(answer);
    const [currentWordMatchIndex, setCurrentWordMatchIndex] = useState(1);
    const [displayedWordMatches, setDisplayedWordMatches] = useState([allWordMatches.at(0)])
  
  
  //TODO: generate random answer word
  const getAnswerIndex = () => Math.floor(Math.random() * 4);
    // Math.floor( 
    //   (Date.now() - new Date(2022, 0, 23, 0, 0, 0).getTime()) / 86400e3
    // ) % NUM_ANSWERS;


    const loadModelPromise = util.promisify(w2v.loadModel);

    async function findMatches(theme) {
        let toReturn = [];
        let model = await loadModelPromise('./config/wordvecs.txt');
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
    }
    console.log(answer);

    const updateDisplayedWords = () => {
        setCurrentWordMatchIndex(currentWordMatchIndex => currentWordMatchIndex + 1);
        setDisplayedWordMatches(displayedWordMatches => [...displayedWordMatches, allWordMatches.at(currentWordMatchIndex)]);
    }


  return (
    <div>
    Current words: {displayedWordMatches}
    Index: {currentWordMatchIndex}
    <hr />
    <button onClick={updateDisplayedWords}> </button>
  </div>
  );
}