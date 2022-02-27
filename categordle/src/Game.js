import './App.css';
import React, { useState, useEffect } from 'react';

export default function Game() {
    const [words, setWords] = useState([]); //all possible answer words
    const [answer, setAnswer] = useState([]); //answer word
    const [win, setWin] = useState(false); //whether the user guessed the answer word
    useEffect(() => import('./words.json').then((m) => setWords(m.default)), []);
    useEffect(() => setAnswer(words[getAnswerIndex()]), [words])
    console.log(answer);

    const [allWordMatches, setAllWordMatches] = useState(findMatches(answer)); //word assosiations to the answer word
    const [currentWordMatchIndex, setCurrentWordMatchIndex] = useState(1); //current word to display
    const [displayedWordMatches, setDisplayedWordMatches] = useState([allWordMatches.at(0)])
    const [guess, setGuess] = useState('');

    //TODO: generate random answer word
    const getAnswerIndex = () => Math.floor(Math.random() * words.length);
    // Math.floor( 
    //   (Date.now() - new Date(2022, 0, 23, 0, 0, 0).getTime()) / 86400e3
    // ) % NUM_ANSWERS;

    //TODO: MAITE give me word associations
    function findMatches(word) {
        return ["word1", "word2", "word3", "word4", "word5", "word6"];
    }

    function resetState() {
        setAnswer(words[getAnswerIndex()]);
        setCurrentWordMatchIndex(0);
        setAllWordMatches(findMatches(answer));
        setDisplayedWordMatches([allWordMatches.at(0)]);
        setWin(false);
        setGuess("");
        console.log(answer)
    }

    const updateDisplayedWords = () => {
        //console.log(guess);
        if (guess.toLocaleLowerCase().trim() === answer.toLocaleLowerCase()) {
            setWin(true)
            //resetState();
        }
        else {
            if (currentWordMatchIndex < 6) {
                setCurrentWordMatchIndex(currentWordMatchIndex => currentWordMatchIndex + 1);
                setDisplayedWordMatches(displayedWordMatches => [...displayedWordMatches, allWordMatches.at(currentWordMatchIndex)]);
                setGuess("");
            }
            else {

            }
        }
    }

    return (
        <div>
            Current words: {displayedWordMatches.map((word) => <><br />{word}</>)}
            <br></br>
            <label>Enter your guess:
                <input value={guess} id="guess" type="text" onChange={event => setGuess(event.target.value)} />
                <button onClick={updateDisplayedWords}>Guess!</button>
            </label>
            {win && <label>correct!</label>}
            <br></br>
            {win && <button onClick={resetState}>Play Again?</button>}
        </div>
    );
}