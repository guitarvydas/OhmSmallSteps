function _try(g,r,e,n) {
    return (function(){return ((function(){return nn};))() ? (function(){return false};)() : (function(a=(function(){return copy((function(){return car((function(){return r};)());})(),(function(){return list((function(){return n};)());})());})(),ne=(function(){return unify((function(){return car((function(){return g};)());})(),(function(){return car((function(){return a};)());})(),(function(){return e};)());})()){return (function(){return ((function(){return ne};))() ? (function(){return prove3((function(){return append((function(){return cdr((function(){return a};)());})(),(function(){return cdr((function(){return g};)());})());})(),(function(){return ne};)(),(function(){return _plus((function(){return 1};)(),(function(){return n};)());})());})() : null}),(function(){return _try((function(){return g};)(),(function(){return cdr((function(){return r};)());})(),(function(){return e};)(),(function(){return n};)());});})()}); };

(define (try g r e n)
  (if nn
      #f
      (let ((a  (copy (car r) (list n)))
             (ne (unify (car g) (car a) e)))
        (if ne
            (prove3 (append (cdr a) (cdr g)) ne (+ 1 n)))
        (try g (cdr r) e n))))

function _try(g,r,e,n) {
    if *(nn) {
	*(#f) 
    } else {
	var a = *( copy(car(*(r)),list(*(n)) );
		   var ne = *( );
    }
}
