/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require('./markov')
const fs = require('fs')
const axios = require('axios')

function textFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error...', err);
            process.exit(1)
        }
        let mm = new MarkovMachine(data)
        console.log(mm.makeText())
    })
}

async function textFromURL(path) {
    try {
        let resp = await axios.get(path)
        let source = resp.data
        let mm = new MarkovMachine(source)
        console.log(mm.makeText())
    } catch (err) {
        console.log(`Error *** status:${err.response.status}, message: ${err.response.statusText}`)
    }
}



let type = process.argv[2]
let path = process.argv[3]

if (type === 'file') {
    textFromFile(path)
} else if (type === 'url') {
    textFromURL(path)
} else {
    console.log('Please enter a supported extension')
}