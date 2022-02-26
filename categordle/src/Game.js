import './App.css';
import React, { useState, useEffect } from 'react';



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



export default function Game() {
  const { answer, answerIndex, isGuessValid } = useWords();
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}
