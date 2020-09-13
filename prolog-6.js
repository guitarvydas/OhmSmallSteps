function Cons(car,cdr) { 
    this.car = car;
    this.cdr = cdr;
    this.isPair = true;
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

let x = new Cons(1,new Cons(2,new Cons(3,new Cons(4,new Cons(5,new Cons(6,null))))));
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
	result = new Cons (arguments[i], result);
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
    return !x;
}
/*

function list() {};

function eq_Q_() {};
function null_Q_() {};
function pair_Q_() {};
*/

function cons(x,y) {
    return new Cons(x,y);
}
function pair_Q_(x) {
    return x && x.isPair;
}

var zzz = new Cons();
console.log(zzz);


function first(x) {return car(x);};
function rest(x) {return cdr(x);};
let link = list;
let L_l = car;
let L_g = cadr;
let L_r = caddr;
let L_e = cadddr;
function L_n(x) {return car(cddddr(x));};
function L_c(x) {return cadr(cddddr(x));};
function clear_r(x) {return set_car_B_(cddr(x),new Cons(new Cons()));};
function back6(l,g,r,e,n,c) {return (function(){if (pair_Q_(g) && pair_Q_(r)) {return prove6(l,g,cdr(r),e,n,c);} else if (pair_Q_(l)) {return prove6(L_l(l),L_g(l),cdr(L_r(l)),L_e(l),L_n(l),L_c(l));} else { return null; }})();};
function prove6(l,g,r,e,n,c) {return (function(){if (null_Q_(g)) {print_frame(e);return back6(l,g,r,e,n,c);} else if (eq_Q_("!",car(g))) {clear_r(c);return prove6(c,cdr(g),r,e,n,c);} else if (eq_Q_("r!",car(g))) {return prove6(l,cddr(g),r,e,n,cadr(g));} else if (null_Q_(r)) {return (function(){ if (null_Q_(l)) {return true;} else {return back6(l,g,r,e,n,c);}})();}else {return (function(a=copy(car(r),n),e_A_=unify(car(a),car(g),e)) {return (function(){ if (e_A_) {return prove6(link(l,g,r,e,n,c),append(cdr(a),list("r!",l),cdr(g)),db,e_A_,_plus(1,n),l);} else {return back6(l,g,r,e,n,c);}})();})();}})();};
let empty = new Cons(new Cons("bottom"));
let name = cadr;
let time = cddr;
function var_Q_(x) {return pair_Q_(x) && eq_Q_("?",car(x));};
function lookup_loop(e,id,tm) {return (function(){if ((!pair_Q_(caar(e)))) {false} else if (eq_Q_(id,name(caar(e))) && eqv_Q_(tm,time(caar(e)))) {return car(e);}else {return lookup_loop(cdr(e));}})();};
function lookup(v,e) {return (function(id=name(v),tm=time(v)) {return lookup_loop(e,id,tm);})();};
function value(x,e) {return (function(){ if (var_Q_(x)) {return (function(v=lookup(x,e)) {return (function(){ if (v) {return value(cadr(v),e);} else {return x;}})();})();} else {return x;}})();};
function copy(x,n) {return (function(){if ((!pair_Q_(x))) {x} else if (var_Q_(x)) {return append(x,n);}else {return cons(copy(car(x),n),copy(cdr(x),n));}})();};
function bind(x,y,e) {return cons(list(x,y),e);};
function unify(x1,y1,e) {return (function(x=value(x1,e),y=value(y1,e)) {return (function(){if (eq_Q_(x,y)) {e} else if (var_Q_(x)) {return bind(x,y,e);} else if (var_Q_(y)) {return bind(y,x,e);} else if ((!pair_Q_(x)) || (!pair_Q_(y))) {false}else {return (function(e_A_=unify(car(x),car(y),e)) {return e_A_ && unify(cdr(x),cdr(y),e_A_);})();}})();})();};
function resolve(x,e) {return (function(){if ((!pair_Q_(x))) {x} else if (var_Q_(x)) {return (function(v=value(x,e)) {return (function(){ if (var_Q_(v)) {return v;} else {return resolve(v,e);}})();})();}else {return cons(resolve(car(x),e),resolve(cdr(x),e));}})();};
function print_frame_loop(ee) {return (function(){ if (pair_Q_(cdr(ee))) {return (function(_xx=0) {(function(){ if (null_Q_(time(caar(ee)))) {return (function(_yy=0) {display(cadaar(ee)); display(" = "); display(resolve(caar(ee),e));return neline();})();} else { return null;}})();return print_frame_loop(cdr(ee));})();} else { return null;}})();};
function print_frame(e) {newline();return print_frame_loop(e);};
let db = new Cons(new Cons(new Cons("some","foo")),new Cons(new Cons("some","bar")),new Cons(new Cons("some","baz")),new Cons(new Cons("eq",new Cons("?","X"),new Cons("?","X"))),new Cons(new Cons("neq",new Cons("?","X"),new Cons("?","Y")),new Cons("eq",new Cons("?","X"),new Cons("?","Y")),"!","fail"),new Cons(new Cons("neq",new Cons("?","X"),new Cons("?","Y"))));
let goals = new Cons(new Cons("some",new Cons("?","X")),new Cons("some",new Cons("?","Y")),new Cons("neq",new Cons("?","X"),new Cons("?","Y")));
prove6(new Cons(),goals,db,empty,1,new Cons());
