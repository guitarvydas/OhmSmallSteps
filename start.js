// usage:
// npm install ohm-js
// node inherit.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('start.ohm')
const grammarsNamespace = ohm.grammars(grammarData)

const input = fs.readFileSync('starttest.js')

const result = grammarsNamespace.Program2.match(input, "StartTest")
// console.log(result)
// console.log(grammarsNamespace.Program2.trace(input).toString())

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
