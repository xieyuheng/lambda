(fixpoint factorial
  (lambda (n)
    (if (zero? n)
      one
      (mul n (factorial (sub1 n))))))
