# Can we count all the real numbers?
Counting comes naturally to us as humans. When we count objects, we assign each object to a natural number. Once all the objects are assigned, the last number assigned represents the total count of the set. For example, Consider the set of all English alphabets $\mathcal{A} = \{a,b,\ldots,z\}$, we say there are 26 alphabets.

But how can we count all the real numbers? Unlike a finite set of objects like the alphabet, the idea is similar: if we can assign a unique natural number to each real number, we would consider the set to be countable. In other words, given an infinite amount of time, we could "pick" and "count" every real number.

Let us simplify our problem to counting all real numbers between in between $0$ and $1$, or simply we can denote it as the interval $[0,1]$

> **💡 Task:**  Pick each real number between 0 and 1 and assign a natural number to it

Can we assign a natural number to all real numbers in this interval? 

Let us pick some arbitarly and list,
$$\begin{array}{c|l} 1 & 0.123456789\ldots \\ 2 & 0.567890123\ldots \\ 3 & 0.789243657\ldots \\ 4 & 0.246801357\ldots \\ 5 & 0.314159265\ldots \\ 6 & 0.908172635\ldots \\ \vdots & \vdots \end{array}$$


If the interval $[0,1]$ is countable, we expect every real number to be in this list. In other words, given infinite time, we could "pick" and "count" each real number one by one.

However, this isn't the case, 

> **🎯 Goal:**  Construct a number $a$ which is not in the list

> 
$$\begin{array}{c|l} 1 & 0.\color{blue}{1}23456789\ldots \\ 2 & 0.5\color{blue}{6}7890123\ldots \\ 3 & 0.78\color{blue}{9}243657\ldots \\ 4 & 0.246\color{blue}{8}01357\ldots \\ 5 & 0.3141\color{blue}{5}9265\ldots \\ 6 & 0.90817\color{blue}{2}635\ldots \\ \vdots & \vdots \end{array}$$

The number $a$ is constructed as follows: for each diagonal entry, add 1 to it (with 9 wrapping around to 0). This gives us:
$$a = 0.270963...$$

Now ask your self, Is this number $a$ in the above list ?. It's not the first one, since the first decimal place differs. Similarly, it's not the second number, nor the 1000th number. At each position, $a$ differs from the diagonal digit of the corresponding number in the list.

This is huge!, We've found a number that we could never reach "by counting," even if we had an infinite amount of time. This is exactly why Mathematicians say the set of Real numbers are "uncountable". or Real numbers are larger infinity than of natural numbers.
