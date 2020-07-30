// usage:
// npm install ohm-js
// node inherit.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('inherit.ohm')
const grammarsNamespace = ohm.grammars(grammarData)

const input = fs.readFileSync('inherittest.js')

const result = grammarsNamespace.Program2.match(input)
// console.log(result)
// console.log(grammarsNamespace.Program2.trace(input).toString())

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
// const semantics = grammar.createSemantics()

// // recursive function to get the source of a non-terminal node
// // from https://repl.it/talk/learn/Making-your-own-programming-language-with-NodeJS/45779
// const node_to_source = node => {
//     if (node.ctorName == "_terminal") {
// 	if (node.primitiveValue.toString() == "\n") {
// 	    return ''
// 	}
// 	else
//             return node.primitiveValue
//     } else {
//         return node.children.map(n => node_to_source(n)).join('')
//     }
// }

// semantics.addOperation(
//     'dump',
//     {
//         Code: (a,b) => {
// 	    return node_to_source(b) + node_to_source(a)
//         },
//         Code3: (a,b,e) => {
// 	    return node_to_source(e) + node_to_source(b) + node_to_source(a)
//         }
//     }
// )

// console.log(semantics(result).dump())
