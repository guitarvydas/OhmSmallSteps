// usage:
// npm install ohm-js
// node scm2js.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('scm2jsbasic.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('scm2jstest.scm')

const result = grammar.match(input)

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
