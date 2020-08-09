const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('dissect.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('dissect.scm')

const result = grammar.match(input)

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}



const semantics = grammar.createSemantics()
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
        Program: (p) => {
	    return node_to_source(p)
        }
    }
)

console.log(semantics(result).dump())


function astString(obj) { return obj.toString() }

class Program { 
    constructor(p) { this.p = p } 
    astString () { 
	console.log("<" + this.constructor.name + ">: " + this.p.constructor.name) ; 
	return "P \n" + this.p.map((x) => x.astString()).join('\n')}}
class Form { 
    constructor(s) { this.s = s } 
    astString () { 
	return "<" + this.constructor.name + ">:" + this.s.constructor.name + " " + "[" + this.s.astString().constructor.name + "] " + this.s.astString();}}

class Atom { constructor(a) { this.a = a } astString() { return this.a.astString() }}
class SBoolean { constructor(b) { this.b = b } astString(){ return this.b }}

// an operation that uses the above classes
semantics.addOperation(
    'ast',
    {
	Program: (p) => { return new Program(p.ast()) },
	Form: (s) => { 
	    console.log("Form " + this.s );},
	Atom: (a) => {
	    console.log("Atom a=" + a);},
	SBoolean: (b) => { 
	    console.log("b is " + b._node.ctorName + " and b's ast is " + b.ast()) ; },
	_terminal: () => { console.log("primitive " + this.primitiveValue); return this.primitiveValue }
    }
)

console.log()
console.log("result")
console.log(result)
console.log()
console.log("semantics")
var sem  = semantics(result)
var tree = sem.ast()
console.log()
console.log("tree")
console.log(tree)
