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
  (newline) (display "prove6") (newline)
  (display "l = ") (display l) (newline)
  (display "g = ") (display g) (newline)
  (display "r = ") (display r) (newline)
  (display "e = ") (display e) (newline)
  (display "n = ") (display n) (newline)
  (display "c = ") (display c) (newline)
  (display "w = ") (display whole-db) (newline)
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
	      (display (cadaar ee))
	      (display " = ")
	      (display (resolve (caar ee) e))
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
;(prove6 '() goals db empty 1 '() db)

(define smalldb '(((x paul))))
(define smallg  '((x ("?" yyy))))
(prove6 '() smallg smalldb empty 1 '() smalldb)

