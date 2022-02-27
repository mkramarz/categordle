const express = require('express');
const app = express();
const port = 5000;

const util = require('util');
const w2v = require('word2vec');

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

app.get('/', (req, res) => {
    findMatches(req).then((hints) => {
        res.send(hints);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});