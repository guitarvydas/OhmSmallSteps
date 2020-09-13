function Cons(car,cdr) { 
    this.car = car;
    this.cdr = cdr;
    this.isPair = true;
    this.toString = function() {
	let str = "(";
	let cell = this;
	while (cell != null) {
	    str = str + cell.car.toString();
	    cell = cell.cdr;
	    if (cell != null) {
		str = str + " ";
	    }
	}
	return str + ")";
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

function cons(x,y) {
    if (x == undefined && y == undefined) {
	return null;
    } else if (y == undefined) {
	return new Cons(x,null);
    } else {
	return new Cons(x,y);
    }
}

let x = cons(1,cons(2,cons(3,cons(4,cons(5,cons(6,null))))));
console.log(x);
console.log(car(x));
console.log(cadr(x));
console.log(caddr(x));
console.log(cadddr(x));
console.log(caddddr(x));
console.log(cdr(cdddddr(x)));

function list() {
    var result = null;
    for(var i = (arguments.length-1); i >= 0 ; i--) {
	result = cons (arguments[i], result);
    }
    return result;
}
let y = list(1,2,3,4,5,6);
console.log(y);
console.log(car(y));
console.log(cadr(y));
console.log(caddr(y));
console.log(cadddr(y));
console.log(caddddr(y));
console.log(cdr(cdddddr(y)));

console.log();

function eq_Q_(x,y) {
    return x === y;
}
console.log(eq_Q_(null,null)); // should be true
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

function null_Q_(x) {
    if (x == null) {
	return true;
    } else if (x.isPair) {
	return false;
    } else {
	throw "internal error x is not a Cons or null: " + x;
	return false;
    }
}
/*

function list() {};

function eq_Q_() {};
function null_Q_() {};
function pair_Q_() {};
*/

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
console.log();
var a = null;
var b = cons("b",a);
var c = cons("b",null);
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

function toDebug (x) {
    if (x == null) {
	return "()";
    } else {
	return x.toString();
    }
}

let lis = list(1,2,3,list(4,5));
let lis2 = null;
console.log(toDebug(lis));
console.log(toDebug(lis2));

console.log();
console.log();
