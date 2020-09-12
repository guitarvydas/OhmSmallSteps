;; utility functions
(define (first x) (car x))
(define (rest x) (cdr x))
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
      (let* ((a  (copy (car r) n))
             (e* (unify (car a) (car g) e)))
        (if e*
            (prove6 (link l g r e n c)
                    (append (cdr a) `(r! ,l) (cdr g))
                    whole-db
                    e*
                    (+ 1 n)
                    l 
		    whole-db)
            (back6 l g r e n c whole-db))))))


(define empty '((bottom)))

(define var '?)
(define name cadr)
(define time cddr)

(define (var? x)
  (and (pair? x)
       (eq? var (car x))))

(define (lookup v e)
  (let ((id (name v))
        (t  (time v)))
    (let loop ((e e))
      (cond ((not (pair? (caar e)))
              #f)
            ((and (eq? id (name (caar e)))
                  (eqv? t (time (caar e))))
              (car e))
            (else
              (loop (cdr e)))))))

(define (value x e)
  (if (var? x)
      (let ((v (lookup x e)))
        (if v
            (value (cadr v) e)
            x))
      x))

(define (make-unique x n)
  (copy x n))

(define (copy x n)
  (cond
    ((not (pair? x)) x)
    ((var? x) (append x n))
    (else
      (cons (copy (car x) n)
            (copy (cdr x) n)))))

(define (bind x y e)
  (cons (list x y) e))

(define (unify x y e)
  (let ((x (value x e))
        (y (value y e)))
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

(define (print-frame e)
  (newline)
  (let loop ((ee e))
    (cond ((pair? (cdr ee))
            (cond ((null? (time (caar ee)))
                    (display (cadaar ee))
                    (display " = ")
                    (display (resolve (caar ee) e))
                    (newline)))
            (loop (cdr ee))))))


;; Negation as failure

(define db
  '(((some foo))
    ((some bar))
    ((some baz))

    ((eq (? X) (? X)))

    ((neq (? X) (? Y))
     (eq (? X) (? Y)) ! fail)

    ((neq (? X) (? Y)))))

(define goals '((some (? X))
                (some (? Y))
                (neq (? X) (? Y))))

; 9-slide PROVE
(prove6 '() goals db empty 1 '() db)

