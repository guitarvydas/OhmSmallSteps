const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('scm2jsbasic2.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('prolog-6.scm')

const result = grammar.match(input)
//console.log(grammar.trace(input).toString())

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
