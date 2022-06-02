const {MarkovMachine} = require('./markov')

let mm = new MarkovMachine('the cat in the hat is in the hat')

describe('MarkovMachine tests', function () {
    test('words', function() {
        let words = mm.words;
        expect(words).toEqual(['the', 'cat', 'in', 'the', 'hat', 'is', 'in', 'the', 'hat'])
    })
    test('makeChains', function() {
        let chains = mm.makeChains();
        expect(chains).toEqual({
            the: [ 'cat', 'hat', 'hat' ],
            cat: [ 'in' ],
            in: [ 'the', 'the' ],
            hat: [ 'is', undefined ],
            is: [ 'in' ]
          })
    })
    test('makeText', function() {
        let text = mm.makeText();
        expect(text).toEqual(expect.any(String))
        expect(text.length).toBeLessThan(100)
    })
})