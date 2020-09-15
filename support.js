// utility functions for Cons.toString()
function isNil(x) {
    if ("string" == typeof(x)) {
	if ("nil" == x) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
function itemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "nil";
    } else if ("object" == typeof(x) && x.isPair) {
	return "";
    } else if ("object" == typeof(x)) {
	return "error(object)";
    } else {
	return x.toString();
    }
}

function toSpacer(x) { // return " . " if cell contains a non-nil/non-next-cell item, return " " if end-of-list, else return ""
    if (x == undefined) {
	return "";
    } else if (x == null) {
	return "";
    } else if (isNil(x)) {
	return "";
    } else if ("object" == typeof(x) && x.isPair) {
	return " ";
    } else if ("object" == typeof(x)) {
	return "";
    } else {
	return " . ";
    }
}

function toTrailingSpace(x) { // return " " if end of list, else ""
    if (x == undefined) {
	return "";
    } else if (x == null) {
	return "";
    } else if (isNil(x)) {
	return "";
    } else if ("object" == typeof(x) && x.isPair) {
	return " ";
    } else if ("object" == typeof(x)) {
	return "";
    } else {
	return "";
    }
}

function continueCDRing(x) {
    if (x == undefined) {
	return false;
    } else if (x == null) {
	return false;
    } else if (isNil(x)) {
	return false;
    } else if ("object" == typeof(x) && x.isPair) {
	return true;
    } else if ("object" == typeof(x)) {
	return false;
    } else {
	return false;
    }
}
function nextCell(x) { // return cdr of cell if we are to continue (determined by continueCDRing function, above), else return undefined
    if (x == undefined) {
	return undefined;
    } else if (x == null) {
	return undefined;
    } else if (isNil(x)) {
	return undefined;
    } else if ("object" == typeof(x) && x.isPair) {
	return cdr(x);
    } else if ("object" == typeof(x)) {
	return undefined;
    } else {
	return undefined;
    }
}
function cellToStr(cell) {
    let str = "(";
    let keepGoing = true;
    while (keepGoing) {
	let a = itemToString(car(cell));
	let d = itemToString(cdr(cell));
	let spacer = toSpacer(cell);
	let trailer = toTrailingSpace(cell);
	str = str + a + spacer + d + trailer;
	keepGoing = continueCDRing(cell);
	cell = nextCell(cell);
    }
    return str + ")";
}
/////

function Cons(car,cdr) { 
    this.car = car;
    this.cdr = cdr;
    this.isPair = true;
    this.toString = function() {  // returns string (a b) or (a . b) with appropriate trailing space in the possible presence of javascript errors (null and undefined)
	cellToStr(this);
   }
};

function car(cell) {
    return cell.car;
}
function cdr(cell) {
    return cell.cdr;
}
function cddr(cell) {
    return cdr(cdr(cell));
}
function cdddr(cell) {
    return cdr(cdr(cdr(cell)));
}
function cddddr(cell) {
    return cdr(cdr(cdr(cdr(cell))));
}
function cdddddr(cell) {
    return cdr(cdr(cdr(cdr(cdr(cell)))))
}

function caar (cell) {
    return car(car(cell));
}

function cadr (cell) {
    return car(cdr(cell));
}

function caddr (cell) {
    return car(cddr(cell));
}

function cadddr (cell) {
    return car(cdddr(cell));
}

function caddddr (cell) {
    return car(cddddr(cell));
}

function cadaar (cell) {
    car(cdr(car(car(cell))));
}

function cons(x,y) {
    if (x == undefined && y == undefined) {
	return "nil";
    } else if (y == undefined) {
	return new Cons(x,"nil");
    } else {
	return new Cons(x,y);
    }
}

function list() {
    var result = "nil";
    for(var i = (arguments.length-1); i >= 0 ; i--) {
	result = cons (arguments[i], result);
    }
    return result;
}
function eq_Q_(x,y) {
    return x === y;
}
function eqv_Q_(x,y) {
    return x === y;
}
function null_Q_(x) {
    if (x == "nil") {
	return true;
    } else if (x.isPair) {
	return false;
    } else {
	throw "internal error x is not a Cons or 'nil': " + x;
	return false;
    }
}


function pair_Q_(x) {
    // Scheme doesn't like truthiness or falsiness, it wants true or false
    if (!x) {
	return false;
    } else if (x.isPair) {
	return true;
    } else {
	return false;
    }
}
function toDebug (x) {
    console.log("toDebug x=");
    console.log(x);
    if (x == "nil") {
	return "()";
    } else if (x == null) {
	return "NULL";
    } else if (x == undefined) {
	return "UNDEFINED";
    } else {
	return x.toString();
    }
}
function string_Q_(s) {
    return s && ("string" == typeof(s));
}

function string_EQ_Q_(s1,s2) {
    return s1 == s2;
}

function _plus(a,b){
    return a + b;
}

function set_car_B_(l,v) { l.car = v; }
function newline () { process.stdout.write("\n"); }
function display(x) { 
    if (x == "nil") {
	process.stdout.write("nil");
    } else if (x == undefined) {
	process.stdout.write("undefined");
    } else {
	process.stdout.write(x.toString()); 
    }
}

/////// tests /////
/*
console.log("\ntesting cons...");
let x = cons(1,cons(2,cons(3,cons(4,cons(5,cons(6,"nil"))))));
console.log(x);
console.log(car(x));
console.log(cadr(x));
console.log(caddr(x));
console.log(cadddr(x));
console.log(caddddr(x));
console.log(cdr(cdddddr(x)));

console.log("\ntesting list...");
let y = list(1,2,3,4,5,6);
console.log(y);
console.log(car(y));
console.log(cadr(y));
console.log(caddr(y));
console.log(cadddr(y));
console.log(caddddr(y));
console.log(cdr(cdddddr(y)));

console.log();

console.log("\ntesting eq_Q_...");
console.log(eq_Q_("nil","nil")); // should be true
console.log(eq_Q_(1,1));       // should be true
console.log(eq_Q_(true,true)); // should be true
console.log(eq_Q_(false,false)); // should be true
console.log(eq_Q_("abc","abc")); // should be false in Scheme, but isn't in JS
var s = "abc";
console.log(eq_Q_(s,s));  // should be true
var s2 = "abc";
console.log(eq_Q_(s,s2));  // should be false in Schem, but isn't in JS

console.log(eq_Q_(x,y));  // should be false
console.log(eq_Q_(x,x));  // should be true

console.log();
console.log(typeof(x));

console.log("\ntesting pair_Q_...");
console.log();
var a = "nil";
var b = cons("b",a);
var c = cons("b","nil");
var d = cons();

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(pair_Q_(a));
console.log(pair_Q_(b));
console.log(pair_Q_(c));
console.log(pair_Q_(d));
console.log(pair_Q_("abc"));
console.log(pair_Q_(42));
*/

function testToDebug() {
    console.log("\ntesting toDebug...");
    
    console.log("a");
    let lis = list(1,2,3,list(4,5));
    console.log("b");
    let lis2 = "nil";
    console.log("c");
    console.log(toDebug(null));
    console.log("cc");
    console.log(cons(1,"nil").toString());
    console.log("ccc");
    console.log(list(1).toString());
    console.log("cccc");
    console.log(toDebug(lis));
    console.log("d");
    //console.log(toDebug(lis2));
    console.log("e");
    
    console.log();
    console.log();
}

function testStrings () {
    
    console.log("\ntesting strings...");
    let lll = list("r!","nil");  // should return ("r!" null)
    console.log (lll.toString());
    console.log (car(lll));
    console.log (cadr(lll));  // crashes if lll is not ("r1" null)
}
function testDotted() {
    let ddd = cons(1,2);
    console.log("\ntesting dotted pair");
    console.log(ddd.toString());
}

//testToDebug();
//testStrings();
testDotted();
    console.log();
    console.log();

