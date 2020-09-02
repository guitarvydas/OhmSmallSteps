function _try(g,r,e,n) {return (function(){ if (null_Q_(r)) {return false;} else {return (function(a=copy(car(r),list(n)),ne=unify(car(g),car(a),e)) {(function(){ if (ne) {return prove3(append(cdr(a),cdr(g)),ne,_plus(1,n));} else { return null;}})();return _try(g,cdr(r),e,n);})();}})();};
function prove3(g,e,n) {return (function(){if (null_Q_(g)) {return print_D_frame(e);}else {return _try(g,db,e,n);}})();};
var link = list;
var L_l = car;
var L_g = cadr;
var L_r = caddr;
var L_e = cadddr;
function L_n(x) {return car(cddddr(x));};
function back5(l,g,r,e,n) {return (function(){ if ((function(){ifpair_Q_(g) && pair_Q_(r) { return true; } else { return false; }))()) {return prove5(l,g,cdr(r),e,n);} else {return prove5(L_l(l),L_g(l),cdr(L_r(l)),L_e(l),L_n(l));}})();};
function prove5(l,g,r,e,n) {return (function(){if (null_Q_(g)) {print_D_frame(e);return back5(l,g,r,e,n);} else if (null_Q_(r)) {return (function(){ if (null_Q_(l)) {return true;} else {return back5(l,g,r,e,n);}})();}else {return (function(a=copy(car(r),n),e*=unify(car(a),car(g),e)) {return (function(){ if (e*) {return prove5(link(l,g,r,e,n),append(cdr(a),cdr(g)),db,e*,_plus(1,n));} else {return back5(l,g,r,e,n);}})();})();}})();};
function L_c(x) {return cadr(cddddr(x));};
function clear_r(x) {return set_D_car!(cddr(x),
				       new List(new List()));};
function back6(l,g,r,e,n,c) {return (function(){if ((function(){ifpair_Q_(g) && pair_Q_(r) { return true; } else { return false; }))()) {return prove6(l,g,cdr(r),e,n,c);} else if (pair_Q_(l)) {return prove6(L_l(l),L_g(l),cdr(L_r(l)),L_e(l),L_n(l),L_c(l));} else { return null; }})();};
function prove6(l,g,r,e,n,c) {return (function(){if (null_Q_(g)) {print_D_frame(e);return back6(l,g,r,e,n,c);} else if (eq?(!,car(g))) {clear_r(c);return prove6(c,cdr(g),r,e,n,c);},(eq?(r!,car(g))) {return prove6(l,cddr(g),r,e,n,cadr(g));},(null_Q_(r)) {return (function(){ if (null_Q_(l)) {return true;} else {return back6(l,g,r,e,n,c);}})();}else {return (function(a=copy(car(r),n),e*=unify(car(a),car(g),e)) {return (function(){ if (e*) {return prove6(link(l,g,r,e,n,c),append(cdr(a),list(r!,l),cdr(g)),db,e*,_plus(1,n),l);} else {return back6(l,g,r,e,n,c);}})();})();}})();};
var empty = new List(new List("bottom"));
var var = ?;
var name = cadr;
var time = cddr;
function var?(x) {return (function(){ifpair_Q_(x) && eq?(var,car(x)) { return true; } else { return false; }))();};
function lookup(v,e) {return (function(id=name(v),t=time(v)) {return let loop e(e) (function(){if (!pair_Q_(caar(e))) {false} else if ((function(){ifeq?(id,name(caar(e))) && eqv?(t,time(caar(e))) { return true; } else { return false; }))()) {return car(e);}else {return loop(cdr(e));}})();})();};
function value(x,e) {return (function(){ if (var?(x)) {return (function(v=lookup(x,e)) {return (function(){ if (v) {return value(cadr(v),e);} else {return x;}})();})();} else {return x;}})();};
function copy(x,n) {return (function(){if (!pair_Q_(x)) {x} else if (var?(x)) {return append(x,n);}else {return cons(copy(car(x),n),copy(cdr(x),n));}})();};
function bind(x,y,e) {return cons(list(x,y),e);};
function unify(x,y,e) {return (function(x=value(x,e),y=value(y,e)) {return (function(){if (eq?(x,y)) {e} else if (var?(x)) {return bind(x,y,e);},(var?(y)) {return bind(y,x,e);},((function(){if!pair_Q_(x) || !pair_Q_(y) { return true; } else { return false; }))()) {false}else {return (function(e*=unify(car(x),car(y),e)) {return (function(){ife* && unify(cdr(x),cdr(y),e*) { return true; } else { return false; }))();})();}})();})();};

function resolve(x,e) {return (function(){if (!pair_Q_(x)) {x} else if (var?(x)) {
return (function(v=value(x,e)) {return (function(){ if (var?(v)) {return v;
} else {
return resolve(v,e);}})();})();
										 }else {
return cons(resolve(car(x),e),resolve(cdr(x),e));}})();};

function print_D_frame_D_loop(ee) {return (function(){ if (pair_Q_(cdr(ee))) {return let (function(){ if (null_Q_(time(caar(ee)))) {return let display(cadaar(ee)) display(" = ") display(resolve(caar(ee),e)) neline();} else { return null;}})() print_D_frame_D_loop(cdr(ee));} else { return null;}})();};

function print_D_frame(e) {newline();return print_D_frame_D_loop(e);};

var db = new List(new List(new List("edge","a","b")),
		  new List(new List("edge","a","f")),
		  new List(new List("edge","a","g")),
		  new List(new List("edge","b","c")),
		  new List(new List("edge","b","d")),
		  new List(new List("edge","c","d")),
		  new List(new List("edge","c","e")),
		  new List(new List("edge","g","h")),
		  new List(new List("edge","d","h")),
		  new List(new List("edge","h","e")),
		  new List(new List("edge","h","f")),
		  new List(new List("path",
				    new List("?","A"),
				    new List("?","B"),
				    new List(new List("?","A"),
					     new List("?","B"))),
			   new List("edge",
				    new List("?","A"),
				    new List("?","B"))),
		  new List(new List("path",
				    new List("?","A"),
				    new List("?","B"),
				    new Pair(new List("?","A") . new List("?","CB"))),
			   new List("edge",
				    new List("?","A"),
				    new List("?","C")),
			   new List("path",
				    new List("?","C"),
				    new List("?","B"),
				    new List("?","CB"))));

var goals = new List(new List("path","a","f",
			      new List("?","P")));
prove3(goals,empty,1);
prove5(new List(),goals,db,empty,1);

var db = new List(new List(new List("some","foo")),
		  new List(new List("some","bar")),
		  new List(new List("some","baz")),
		  new List(new List("eq",
				    new List("?","X"),
				    new List("?","X"))),
		  new List(new List("neq",
				    new List("?","X"),
				    new List("?","Y")),
			   new List("eq",
				    new List("?","X"),
				    new List("?","Y")),"!","fail"),
		  new List(new List("neq",
				    new List("?","X"),
				    new List("?","Y"))));
var goals = new List(new List("some",
			      new List("?","X")),
		     new List("some",
			      new List("?","Y")),
		     new List("neq",
			      new List("?","X"),
			      new List("?","Y")));
prove6(new List(),goals,db,empty,1,
       new List());
