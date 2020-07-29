// usage:
// npm install ohm-js
// node skipspaces.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('skipspaces.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('skipspacestest.js')

const result = grammar.match(input)

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
	if (node.primitiveValue.toString() == "\n") {
	    return ''
	}
	else
            return node.primitiveValue
    } else {
        return node.children.map(n => node_to_source(n)).join('')
    }
}

semantics.addOperation(
    'dump',
    {
        Code: (a,b) => {
	    return node_to_source(b) + node_to_source(a)
        }
    }
)

console.log(semantics(result).dump())
