const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('scm2js.ohm')
const grammar = ohm.grammar(grammarData)

//const input = fs.readFileSync('prolog-6.scm')
const input = fs.readFileSync('junk.scm')

const result = grammar.match(input)
// console.log(grammar.trace(input).astString())

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


//function astString(obj) { debugger; throw "astString called on a non-ast object: " + obj.toString() }
function astString(obj) { return obj.toString() }

// a class for every non-whitespace production, except the lowest-level ones (LetChar, LC, UC)
class Program { 
    constructor(p) { this.p = p } 
    astString () { 
	console.log("<" + this.constructor.name + ">: " + this.p.constructor.name) ; 
	return "P \n" + this.p.map((x) => x.astString()).join('\n')}}
class Form { 
    constructor(s) { this.s = s } 
    astString () { 
	return "<" + this.constructor.name + ">:" + this.s.constructor.name + " " + "[" + this.s.astString().constructor.name + "] " + this.s.astString();}}

class QuotedSexp { constructor (q, s) { this.q = q ; this.s = s } astString () { return "'" + this.s.astString() }}
class BackQuotedSexp { constructor (q, s) { this.q = q ; this.s = s } astString () { return "`" + this.s.astString() }}
class CommaSexp { constructor (c, s) { this.c = c ; this.s = s } astString () { return "(comma)" + this.s.astString() }}
class SList { constructor (l) { this.l = l } astString () { return this.l.astString() }}
class DottedList { constructor (lp, items, dot, lastItem, rp) { this.lp = lp; this.items = items; this.dot = dot; this.lastItem = lastItem; this.rp = rp } astString () { return "(" + this.items.map((x) => x.astString()).join(" ") + " . " + this.lastItem.astString() + ")" }}
class NullTerminatedList{
    constructor(lp, items, rp) { this.lp = lp; this.items = items ; this.rp = rp }
    astString() { return "(" + this.items.map((x) => x.astString()).join(" ") + ")"}}
class ListItem { constructor(item) { this.item = item } astString(){ return this.item.astString() }}
class Atom { constructor(a) { this.a = a } astString() { return this.a.astString() }}
class NullList { constructor(lp, rp) { this.lp = lp; this.rp = rp} astString () { return "()" } }
class SBoolean { constructor(b) { this.b = b } astString(){ return this.b }}
class SInteger { constructor(ns) { this.ns = ns } astString(){ return this.ns }}
class Numchar { constructor(d) { this.d = d } astString(){ return this.d }}
class SString { constructor(q1, chars, q2) { this.q1 = q1; this.chars = chars; this.q2 = q2 } astString(){return this.chars}}
class SSymbol { 
    constructor(c, cs) { this.c = c; this.cs = cs; } 
    astString(){ console.log("cs is " + this.cs) ; return this.c.astString() + this.cs.map((x) => x.astString()).join(''); }}
class Letchar { constructor(c) { this.c = c } astString(){ return this.c.astString() }}
class LC { constructor(c) { this.c = c } astString(){ return this.c.astString() }}
class UC { constructor(c) { this.c = c } astString(){ return this.c.astString() }}

// an operation that uses the above classes
semantics.addOperation(
    'ast',
    {
	Program: (p) => { return new Program(p.ast()) },
	Form: (s) => { console.log(s); console.log("Form " + this.s ); console.log(" " + this.s.ast()); return new Form(s.ast()) },
	QuotedSexp: (q, s) => { return new QuotedSexp(q.ast(), s.ast()) },
	BackQuotedSexp: (q, s) => { return new BackQuotedSexp(q.ast(), s.ast()) },
	CommaSexp: (q, s) => { return new CommaSexp(q.ast(), s.ast()) },
	SList: (l) => { return new SList(l.ast()) },
	DottedList: (lp, items, dot, lastItem, rp) => { return new DottedList(lp.ast(), items.ast(), dot.ast(), lastItem.ast(), rp.ast()) },
	NullTerminatedList: (lp, items, rp) => { return new NullTerminatedList(lp.ast(), items.ast(), rp.ast()) },
	ListItem: (item) => { return new ListItem(item.ast()) },
	Atom: (a) => { return new Atom(a.ast())	},
	NullList: (lp, rp) => { return new NullList(lp.ast(),rp.ast()) },

	//SBoolean: (b) => { return new SBoolean(node_to_source(b._node)) },
	SBoolean: (b) => { console.log("b is " + b._node.ctorName + " and b's ast is " + b.ast()) ; return new SBoolean(b.ast()) },

	SInteger: (ns) => { return new SInteger(node_to_source(ns._node)) },
	Numchar: (d) => { return new Numchar(node_to_source(d._node)) },
	SString: (q1, chars, q2) => { return new SString(q1.ast(), node_to_source(chars._node), q2.ast())},
	SSymbol: (c, cs) => { console.log("c is " + c._node.ctorName + " and cs is " + cs._node.ctorName) ; return new SSymbol(c.ast(),cs.ast()) },
	Letchar: (c) => { return new Letchar(c.ast()) },
	LC: (c) => { return new LC(c.ast()) },
	UC: (c) => { return new UC(c.ast()) },
	_terminal: () => { console.log("primitive " + this.primitiveValue); return this.primitiveValue }
    }
)

var tree = semantics(result).ast()
console.log()
try {
    console.log(tree.astString())
}
catch (e) {
    console.log("Error: " + e);
    console.log(new Error().stack)
}
