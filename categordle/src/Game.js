import './App.css';
import React, { useState, useEffect } from 'react';





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
  
  
  //TODO: MAITE give me word associations
  function findMatches(word) {
    return ["word1", "word2", "word3", "word4", "word5", "word6"];
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