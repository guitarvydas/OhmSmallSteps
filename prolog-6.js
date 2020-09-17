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
function isCons (maybeCell) {
    if ("object" == typeof(maybeCell)) {
	if (maybeCell.isPair) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
function carItemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "nil";
    } else if (isCons(x)) {
	return x.toString();
    } else {
	return x.toString();
    }
}
function cdrItemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "";
    } else if (isCons(x)) {
	return "";
    } else {
	return x.toString();
    }
}

function toSpacer(x) { // return " . " if cell contains a non-nil/non-next-cell item, return " " if end-of-list, else return ""
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    if (x == undefined) {
	return " ";
    } else if (x == null) {
	return " ";
    } else if ( ("object" == typeof(x) && x.isPair) ) {
	if ( ("object" == typeof(x.cdr)) ) {
	    return " ";
	} else if (isNil(x.cdr)) {
	    return "";
	} else {
	    return " . ";
	}
    } else {
	throw "can't happen";
    }
}

function toTrailingSpace(x) { // return " " if end of list, else ""
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    if (x == undefined) {
	return " ";
    } else if (x == null) {
	return " ";
    } else if ( ("object" == typeof(x) && x.isPair) ) {
	if ( ("object" == typeof(x.cdr)) ) {
	    return " ";
	} else if (isNil(x.cdr)) {
	    return "";
	} else {
	    return "";
	}
    } else {
	throw "can't happen";
    }
}


function continueCDRing(maybeCell) {  // if x.cdr is another Cons, return true, if it's "nil" return false, if it's a primitive return false, else return false
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    // x should be a Cons cell or "nil" or a primitive, but it might be null or undefined (an internal error that I want to see)
    if (maybeCell == undefined) {
	return false;
    } else if (maybeCell == null) {
	return false;
    } else if (isNil(maybeCell)) {
	return false;
    } else if (isCons(maybeCell)) {  // a Cons cell
	let next = cdr(maybeCell);
	if (isCons(next)) {
	    return true;
	} else {
	    return false;
	}
    } else if ("object" == typeof(maybeCell)) {
	return false;
    } else {
	return false;
    }
}
function nextCell(maybeCell) { // return cdr of cell if we are to continue (determined by continueCDRing function, above), else return undefined
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    // x should be a Cons cell or "nil" or a primitive, but it might be null or undefined (an internal error that I want to see)
    if (maybeCell == undefined) {
	return undefined;
    } else if (maybeCell == null) {
	return undefined;
    } else if (isNil(maybeCell)) {
	return undefined;
    } else if (isCons(maybeCell)) {
	return cdr(maybeCell);  // this will return a Cons or might return "nil" if at end of list
    } else if ("object" == typeof(maybeCell)) {
	return undefined;
    } else {
	return undefined;
    }
}
function cellToStr(cell) {
    let str = "(";
    let keepGoing = true;
    while (keepGoing) {
	let a = carItemToString(car(cell));
	let d = cdrItemToString(cdr(cell));
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
	return cellToStr(this);
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
    return car(cdr(car(car(cell))));
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
    let lll = cons(8,9);
    console.log(lll.toString());
    let cc = list(10);
    console.log(cc.toString());
    let ccc = list(12,13);
    console.log(ccc.toString());
    let lccc = list(14,15,ddd);
    console.log(lccc.toString());
    let cccl = list(list(16,17));
    console.log(cccl.toString());
    let lld = list(cons(18,19));
    console.log(lld.toString());
    let ld = cons(20,cons(21,22));
    console.log(ld.toString());
}

//testToDebug();
//testStrings();
//testDotted();
//    console.log();
//    console.log();


function first(x) {
return car(x);
};
function rest(x) {
return cdr(x);
};
function AppendInefficient(list1,list2) {
return (function(){
if (null_Q_(list1)) {
return list2;
} else {
return cons(car(list1),AppendInefficient(cdr(list1),list2));
}
})();
};
function AppendInefficient3(list1,list2,list3) {
return AppendInefficient(list1,AppendInefficient(list2,list3));
};
let link = list;
let L_l = car;
let L_g = cadr;
let L_r = caddr;
let L_e = cadddr;
function L_n(x) {
return car(cddddr(x));
};
function L_c(x) {
return cadr(cddddr(x));
};
function clear_r(x) {
return set_car_B_(cddr(x),list(list()));
};
function back6(l,g,r,e,n,c,whole_db) {
return (function(){
if (pair_Q_(g) && pair_Q_(r)) {
return prove6(l,g,cdr(r),e,n,c,whole_db);

} else if (pair_Q_(l)) {
return prove6(L_l(l),L_g(l),cdr(L_r(l)),L_e(l),L_n(l),L_c(l),whole_db);

} else {
return null;
}
})();
};
function prove6(l,g,r,e,n,c,whole_db) {
return (function(){
if (null_Q_(g)) {
print_frame(e);
return back6(l,g,r,e,n,c,whole_db);

} else if (eq_Q_("!",car(g))) {
clear_r(c);
return prove6(c,cdr(g),r,e,n,c,whole_db);

} else if (eq_Q_("r!",car(g))) {
return prove6(l,cddr(g),r,e,n,cadr(g),whole_db);

} else if (null_Q_(r)) {
return (function(){
if (null_Q_(l)) {
return true;
} else {
return back6(l,g,r,e,n,c,whole_db);
}
})();

}else {
return (function(a=copy(car(r),n)) {
return (function(e_A_=unify(car(a),car(g),e)) {
return (function(){
if (e_A_) {
return prove6(link(l,g,r,e,n,c),AppendInefficient3(cdr(a),list("r!",l),cdr(g)),whole_db,e_A_,_plus(1,n),l,whole_db);
} else {
return back6(l,g,r,e,n,c,whole_db);
}
})();

})();

})();
}

})();
};
let empty = list(list("bottom"));
let name = cadr;
let time = cddr;
function var_Q_(x) {
return pair_Q_(x) && string_Q_(car(x)) && string_EQ_Q_("?",car(x));
};
function lookup_loop(e,id,tm) {
return (function(){
if ((!pair_Q_(caar(e)))) {
return false;

} else if (eq_Q_(id,name(caar(e))) && eqv_Q_(tm,time(caar(e)))) {
return car(e);

}else {
return lookup_loop(cdr(e),id,tm);
}

})();
};
function lookup(v,e) {
return (function(id=name(v),tm=time(v)) {
return lookup_loop(e,id,tm);

})();
};
function value(x,e) {
return (function(){
if (var_Q_(x)) {
return (function(v=lookup(x,e)) {
return (function(){
if (v) {
return value(cadr(v),e);
} else {
return x;
}
})();

})();
} else {
return x;
}
})();
};
function copy(x,n) {
return (function(){
if ((!pair_Q_(x))) {
return x;

} else if (var_Q_(x)) {
return AppendInefficient(x,n);

}else {
return cons(copy(car(x),n),copy(cdr(x),n));
}

})();
};
function bind(x,y,e) {
return cons(list(x,y),e);
};
function unify(x1,y1,e) {
return (function(x=value(x1,e),y=value(y1,e)) {
return (function(){
if (eq_Q_(x,y)) {
return e;

} else if (var_Q_(x)) {
return bind(x,y,e);

} else if (var_Q_(y)) {
return bind(y,x,e);

} else if ((!pair_Q_(x)) || (!pair_Q_(y))) {
return false;

}else {
return (function(e_A_=unify(car(x),car(y),e)) {
return e_A_ && unify(cdr(x),cdr(y),e_A_);

})();
}

})();

})();
};
function resolve(x,e) {
return (function(){
if ((!pair_Q_(x))) {
return x;

} else if (var_Q_(x)) {
return (function(v=value(x,e)) {
return (function(){
if (var_Q_(v)) {
return v;
} else {
return resolve(v,e);
}
})();

})();

}else {
return cons(resolve(car(x),e),resolve(cdr(x),e));
}

})();
};
function print_frame_loop(e,ee) {
return (function(){
if (pair_Q_(cdr(ee))) {
return (function(_xx=0) {
(function(){
if (null_Q_(time(caar(ee)))) {
return (function(_yy=0) {
(function(answer=list(cadaar(ee),resolbe(caar(ee),e))) {
return display(answer);

})();
return newline();

})();
} else {
return null;
}
})();
return print_frame_loop(e,cdr(ee));

})();
} else {
return null;
}
})();
};
function print_frame(e) {
newline();
return print_frame_loop(e,e);
};
let db = list(list(list("some","foo")),list(list("some","bar")),list(list("some","baz")),list(list("eq",list("?","X"),list("?","X"))),list(list("neq",list("?","X"),list("?","Y")),list("eq",list("?","X"),list("?","Y")),"!","fail"),list(list("neq",list("?","X"),list("?","Y"))));
let goals = list(list("some",list("?","X")),list("some",list("?","Y")),list("neq",list("?","X"),list("?","Y")));
prove6(list(),goals,db,empty,1,list(),db);



;; utility functions
(define (first x) (car x))
(define (rest x) (cdr x))

(define (AppendInefficient list1 list2)
  (if (null? list1)
      list2
      (cons (car list1) (AppendInefficient (cdr list1) list2))))

(define (AppendInefficient3 list1 list2 list3)
  (AppendInefficient list1 (AppendInefficient list2 list3)))

;;;;

(define link list)
(define L_l car)
(define L_g cadr)
(define L_r caddr)
(define L_e cadddr)
(define (L_n x) (car (cddddr x)))


(define (L_c x) (cadr (cddddr x)))


(define (clear_r x)
  (set-car! (cddr x) '(())))


(define (back6 l g r e n c whole-db)
  (cond
    ((and (pair? g)
          (pair? r))
      (prove6 l g (cdr r) e n c whole-db))
    ((pair? l)
      (prove6 (L_l l)
              (L_g l)
              (cdr (L_r l))
              (L_e l)
              (L_n l)
              (L_c l)
	      whole-db))))


(define (prove6 l g r e n c whole-db)
;  (newline) (display "prove6") (newline)
;  (display "l = ") (display l) (newline)
;  (display "g = ") (display g) (newline)
;  (display "r = ") (display r) (newline)
;  (display "e = ") (display e) (newline)
;  (display "n = ") (display n) (newline)
;  (display "c = ") (display c) (newline)
;  (display "w = ") (display whole-db) (newline)
  (cond
    ((null? g)
      (print-frame e)
      (back6 l g r e n c whole-db))
    ((eq? '! (car g))
      (clear_r c)
      (prove6 c (cdr g) r e n c whole-db))
    ((eq? 'r! (car g))
      (prove6 l (cddr g) r e n (cadr g) whole-db))
    ((null? r)
      (if (null? l)
          #t
          (back6 l g r e n c whole-db)))
    (else
      (let ((a  (copy (car r) n)))
        (let ((e* (unify (car a) (car g) e)))
          (if e*
              (prove6 (link l g r e n c)
                      (AppendInefficient3 (cdr a) `(r! ,l) (cdr g))
                      whole-db
                      e*
                      (+ 1 n)
                      l
		      whole-db)
              (back6 l g r e n c whole-db))))
)))


(define empty '((bottom)))

;(define var '?) ; removed for transpilation
(define name cadr)
(define time cddr)

(define (var? x)
  (and (pair? x)
       (string? (car x))
       (string=? "?" (car x))))

;; manually rewritten named let
(define (lookup_loop e id tm)
    (cond ((not (pair? (caar e)))
	   #f)
	  ((and (eq? id (name (caar e)))
		(eqv? tm (time (caar e))))
	   (car e))
	  (else
	   (lookup_loop (cdr e) id tm))))

(define (lookup v e)
    (let ((id (name v))
          (tm  (time v)))
      (lookup_loop e id tm)))
;;; end rewrite

(define (value x e)
  (if (var? x)
      (let ((v (lookup x e)))
        (if v
            (value (cadr v) e)
            x))
      x))

(define (copy x n)
  (cond
    ((not (pair? x)) x)
    ((var? x) (AppendInefficient x n))
    (else
      (cons (copy (car x) n)
            (copy (cdr x) n)))))

(define (bind x y e)
  (cons (list x y) e))

; (define (unify x y e)
;   (let ((x (value x e))
;         (y (value y e)))
(define (unify x1 y1 e)
  (let ((x (value x1 e))
        (y (value y1 e)))
    (cond
      ((eq? x y) e)
      ((var? x) (bind x y e))
      ((var? y) (bind y x e))
      ((or (not (pair? x))
           (not (pair? y))) #f)
      (else
        (let ((e* (unify (car x) (car y) e)))
          (and e* (unify (cdr x) (cdr y) e*)))))))


(define (resolve x e)
  (cond ((not (pair? x)) x)
        ((var? x)
          (let ((v (value x e)))
            (if (var? v)
                v
                (resolve v e))))
        (else
          (cons
            (resolve (car x) e)
            (resolve (cdr x) e)))))

;; (define (print-frame e)
;;   (newline)
;;   (let loop ((ee e))
;;     (cond ((pair? (cdr ee))
;;             (cond ((null? (time (caar ee)))
;;                     (display (cadaar ee))
;;                     (display " = ")
;;                     (display (resolve (caar ee) e))
;;                     (newline)))
;;             (loop (cdr ee))))))

;; manually rewritten version w/o named let
(define (print_frame_loop e ee)
  (if (pair? (cdr ee))
      (let ((_xx 0))
	(if (null? (time (caar ee)))
	    (let ((_yy 0))
	      (let ((answer (list (cadaar ee) (resolve (caar ee) e))))
		(display answer))
	      (newline)))
	(print_frame_loop e (cdr ee)))))

(define (print-frame e)
  (newline)
  (print_frame_loop e e))
;; end manually rewritten version w/o named let


;; Negation as failure

(define db
  '(((some foo))
    ((some bar))
    ((some baz))

    ((eq ("?" X) ("?" X)))

    ((neq ("?" X) ("?" Y))
     (eq ("?" X) ("?" Y)) ! fail)

    ((neq ("?" X) ("?" Y)))))

(define goals '((some ("?" X))
                (some ("?" Y))
                (neq ("?" X) ("?" Y))))

; 9-slide PROVE
(prove6 '() goals db empty 1 '() db)

; simple test
;(define smalldb '(((x paul))))
;(define smallg  '((x ("?" yyy))))
;(prove6 '() smallg smalldb empty 1 '() smalldb)

