import {createRequire} from "module"
const require = createRequire(import.meta.url);

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

import {commonWords} from './words.js'

const util = require('util');
const w2v = require('word2vec');

function pickWord() {
    let index = Math.floor(Math.random() * commonWords.length);
    return commonWords[index];
}

const loadModelPromise = util.promisify(w2v.loadModel);

async function findMatches(theme) {
    let toReturn = [];
    let model = await loadModelPromise('/home/maite/WebstormProjects/categordle2/server/wordvecs.txt');
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

app.get('/api', (req, res) => {
    let word = pickWord();
    const wordAndHints = [word];
    findMatches(word).then((hints) => {
        for (let hint of hints) {
            wordAndHints.push(hint);
        }
        res.send(wordAndHints);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});