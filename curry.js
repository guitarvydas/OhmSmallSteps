function pr(x) {
    console.log(x);
}
function cons(a,b) {
    return [a,b];
}
function car(lis){
    return lis[0];
}
function cadr(lis){
    return lis[1];
}

/*
(define L_l car)
(define L_g cadr)
*/

pr(1);
pr(cons(2,3));
pr(car(cons(4,5)));
pr(cadr(cons(6,7)));
console.log(car([8,9]));
console.log( ((function(x){return car(x);})([10,11])) );

console.log( cons(((function(x){return car(x);})([10,11])),12) );
var fcar = (function(x){return car(x);});
console.log( cons(fcar([13,14]),15) );

var fcons = (function(x,y){return cons(x,y);});
console.log( fcons(fcar([16,17]),18) );

function cons1(x){
    return (function(y){return cons(x,y)});
}
console.log((cons1(19))(20));

var a = (cons1(21))(22);
console.log(a);
var L_1 = (function(x){return car(x);});
console.log(L_1(a));

// pr((function(){return car})([8,9]));
// pr((function(){return car})(cons(10,11)));
