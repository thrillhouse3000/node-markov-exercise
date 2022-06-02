/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {}
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]
      let next = i + 1
      if (chains[word]) {
        chains[word].push(this.words[next])
      } else if (this.words.indexOf(word) === this.words.length) {
        chains[word] = [null]
      } else {
        chains[word] = [this.words[next]]
      }
    }
    return chains
  }

  getRandom(iterable) {
    return Math.floor(Math.random() * iterable.length)
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [this.words[this.getRandom(this.words)]]
    let chains = this.makeChains()
    for (let i = 0; i < numWords; i++) {
      let word = text[i]
      if (chains[word] === undefined) {
        break;
      } else {
      text.push(chains[word][this.getRandom(chains[word])])
      }
    }
    return text.join(' ').trim();
  }
}

let mm = new MarkovMachine('the cat in the hat is in the hat')

module.exports = {MarkovMachine}