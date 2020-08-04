const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('quote.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('quote.scm')
const input_rewritten = fs.readFileSync('quote_rewritten.scm')

const result = grammar.match(input)

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}

const result_rewritten = grammar.match(input_rewritten)

if (result_rewritten.succeeded()) {
    console.log("Matching Rewrite Succeeded")
} else {
    console.log("Matching Rewrite Failed")
}


console.log()
console.log("result cst")
console.log(result._cst)
console.log()
console.log(JSON.stringify(result._cst))

console.log()
console.log("result_rewritten cst")
console.log(result_rewritten._cst)
console.log()
console.log(JSON.stringify(result_rewritten._cst))

