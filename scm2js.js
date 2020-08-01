const fs = require ('fs')
const ohm = require ('ohm-js')
const grammarData = fs.readFileSync('scm2js.ohm')
const grammar = ohm.grammar(grammarData)

const input = fs.readFileSync('prolog-6.scm')

const result = grammar.match(input)
// console.log(grammar.trace(input).toString())

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

// a class for every non-whitespace production, except the lowest-level ones (LetChar, LC, UC)
class Program { constructor(p) { this.p = p } }
class Scm { constructor(s) { this.s = s } }
class QuotedSexp { constructor (q, s) { this.q = q ; this.s = s } }
class BackQuotedSexp { constructor (q, s) { this.q = q ; this.s = s } }
class CommaSexp { constructor (c, s) { this.c = c ; this.s = s } }
class SList { constructor (l) { this.l = l } }
class DottedList { constructor (lp, items, dot, lastItem, rp) { this.lp = lp; this.items = items; this.dot = dot; this.lastItem = lastItem; this.rp = rp }}
class NullTerminatedList { constructor(lp, items, rp) { this.lp = lp; this.items = items ; this.rp = rp }}
class ListItem { constructor(item) { this.item = item }}
class Atom { constructor(a) { this.a = a }}
class NullList { constructor(lp, rp) { this.lp = lp; this.rp = rp}}
class SBoolean { constructor(b) { this.b = b }}
class SInteger { constructor(ns) { this.ns = ns }}
class Numchar { constructor(d) { this.d = d }}
class SString { constructor(q1, chars, q2) { this.q1 = q1; this.chars = chars; this.q2 = q2 }}
class Symbol { constructor(c, cs) { this.c = c; this.cs = cs; }} 

semantics.addOperation(
    'ast',
    {
	Program: (p) => { return new Program(p.ast()) },
	Scm: (s) => { return new Scm(s.ast()) },
	QuotedSexp: (q, s) => { return new QuotedSexp(q.ast(), s.ast()) },
	BackQuotedSexp: (q, s) => { return new BackQuotedSexp(q.ast(), s.ast()) },
	CommaSexp: (q, s) => { return new CommaSexp(q.ast(), s.ast()) },
	SList: (l) => { return new SList(l.ast()) },
	DottedList: (lp, items, dot, lastItem, rp) => { return new DottedList(lp.ast(), items.ast(), dot.ast(), lastItem.ast(), rp.ast()) },
	NullTerminatedList: (lp, items, rp) => { return new NullTerminatedList(lp.ast(), items.ast(), rp.ast()) },
	ListItem: (item) => { return new ListItem(item.ast()) },
	Atom: (a) => { return new Atom(a.ast())},
	NullList: (lp, rp) => { return new NullList(lp.ast(),rp.ast())},
	SBoolean: (b) => { return new SBoolean(b.ast()) },
	SInteger: (ns) => { return new SInteger(ns.ast()) },
	Numchar: (d) => { return new Numchar(d.ast()) },
	SString: (q1, chars, q2) => { return new SString(q1.ast(), chars.ast(), q2.ast())},
	Symbol: (c, cs) => { return new Symbol(c.ast(),cs.ast()) },
	_terminal: () => { return this.primitiveValue }
    }
)

var tree = semantics(result).ast();
