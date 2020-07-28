// usage:
// npm install ohm-js
// node source2source1a.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('source2source.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('s2s.js')

const result = grammar.match(input)

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
