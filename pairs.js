// usage:
// npm install ohm-js
// node pairs.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('pairs.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('pairtest.js')

const result = grammar.match(input)
//console.log(grammar.trace(input).toString())

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}

const semantics = grammar.createSemantics()

// recursive function to get the source of a non-terminal node
// from https://repl.it/talk/learn/Making-your-own-programming-language-with-NodeJS/45779
const node_to_source = node => {
    if (node.ctorName == "_terminal") {
        return node.primitiveValue
    } else {
        return node.children.map(n => node_to_source(n)).join('')
    }
}

semantics.addOperation(
    'dump',
    {
        code: (braced,eol) => {
	    return "matching pairs of braces=/" +  node_to_source(braced) + "/"
        }
    }
)

console.log(semantics(result).dump())
