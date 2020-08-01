// usage:
// npm install ohm-js
// node scm2jsbasic1.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('scm2jsbasic1.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('scm2jstest1.scm')

const result = grammar.match(input)

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
