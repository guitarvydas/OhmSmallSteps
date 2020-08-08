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

class cstNode {
    constructor(name,node) {this.name = name ; this.node = node}
    cstToString() { return this.node.cstToString() }
}
class cstNode2 {
    constructor(name,node1,node2) {this.name = name ; this.node1 = node1 ; this.node2 = node2}
    cstToString() { return this.node1.cstToString() + "!" + this.node2.cstToString()}
}
class cstNode0 {
    constructor(name) {this.name = name }
    cstToString() { return ""}
}
class cstIter {
    constructor(name,arr){ this.name=name ; this.arr = arr}
    cstToString() { return this.arr.map(cstToString).join('@') }
}
class cstTerminal {
    constructor(name,item){ this.name=name ; this.item = item}
    cstToString() { return this.item.toString() }
}

var s = grammar.createSemantics()
s.addOperation(
    'asString',
    {
	Program: function(x) { return x.asString() },
	Form: function(x) { return x.asString() },
	QuotedSexp: function(_,x) { return "'" + x.asString() },
	BackQuotedSexp: function(_,x) { return "`" + x.asString() },
	CommaSexp: function(_,x) { return "," + x.asString() },
	SList: function(x) { return x.asString() },
	DottedList: function(_lpar,x1,_dot,x2,_rpar) { return "(" + x1.asString() + " . " + x2.asString() + ")" },
	NullTerminatedList: function(_lpar,x,_rpar) { return  "(" + x.asString() + ")" },
	ListItem: function(x) { return x.asString() },
	Atom: function(x) { return x.asString() },
	NullList: function(_lpar,_rpar) { return "()" }
	SBoolean: function(x) { return x.asString() }
        SInteger: function(x) { return x.asString() }
	Numchar: function(x) { return x.asString() }
	SString: function(_q1,x,_q2) { return '"' + x.asString() + '"' },
	SSymbol: function(c, iterc) { return c.asString() + iterc.asString() }
	Letchar: function(x) { return x.asString() }
	LC: function(x) { return x.asString() },
	UC: function(x) { return x.asString() }
    }
)
    

const result_rewritten = grammar.match(input_rewritten)

if (result_rewritten.succeeded()) {
    console.log("Matching Rewrite Succeeded")
} else {
    console.log("Matching Rewrite Failed")
}


console.log()
console.log("result cst")
// console.log(result._cst)
//console.log()
console.log(JSON.stringify(result._cst))
result_cst = cst(result).cstToString()
console.log(result_cst)

//console.log()
//console.log("result_rewritten cst")
//console.log(result_rewritten._cst)
//console.log()
//console.log(JSON.stringify(result_rewritten._cst))

