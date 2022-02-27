import './App.css';
import React, {useEffect, useState} from 'react';

export default function Game() {
    const [words, setWords] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [win, setWin] = useState(false);
    // useEffect(() => import('../../server/config/words.json').then((m) => setWords(m.default)), []);
    useEffect(() => setAnswer(words[getAnswerIndex()]), [words])
    console.log(answer);

    const allWordMatches = findMatches(answer);
    const [currentWordMatchIndex, setCurrentWordMatchIndex] = useState(1);
    const [displayedWordMatches, setDisplayedWordMatches] = useState([allWordMatches.at(0)])
    const [guess, setGuess] = useState('');

    //TODO: generate random answer word
    const getAnswerIndex = () => Math.floor(Math.random() * words.length);
    // Math.floor(
    //   (Date.now() - new Date(2022, 0, 23, 0, 0, 0).getTime()) / 86400e3
    // ) % NUM_ANSWERS;

    //TODO: MAITE give me word associations
    function findMatches(word) {
        fetch("/api").then((res) => {
            console.log(res);
        });
    }

    function resetState() {
        setAnswer(words[getAnswerIndex()]);
        setCurrentWordMatchIndex(0);
        setDisplayedWordMatches([allWordMatches.at(0)])
    }

    const updateDisplayedWords = () => {
        //console.log(guess);
        if (guess.toLocaleLowerCase().trim() === answer.toLocaleLowerCase()) {
            console.log("correct");
            setWin(true)
            resetState();
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

        </div>
    );
}