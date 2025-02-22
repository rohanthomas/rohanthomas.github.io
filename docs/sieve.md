# Sieve of Eratosthenes: Time Complexity using Inclusion-Exclusion Principle

Authored by: Rohan Thomas

Sieve of Eratosthenes is an ancient algorithm introduced by Greek mathematician Eratosthenes in the third century BC, used to find prime numbers up to a given number. In this material we will discuss this algorithm and determine the exact number of eliminations made.

<aside>

> **💡 Problem:**  Given $n$ $\in$ $\mathbb{N}$. List all the primes up to $n$




</aside>

## Algorithm:

1. List all integers from 2 to $n$
2. Start with the smallest prime, set  $p = 2$
3. Eliminate all the proper multiples of $p$ which are less than $n$ such as $2p, 3p, 4p, . . .$
4. Assign the value of $p$ to the smallest number next greater than $p$ which have been not eliminated, remove the multiples of that number
5. Repeat the steps until  $p \leq \sqrt{n}$        

Let’s consider the following example of listing all the primes less than $n = 15$

1. Generate a list of numbers from 2 to 15
    
    
    |  2  |  3 |  4  |  5 |  6 |  7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
    | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

---

1. Starting with the smallest prime  $p = 2$, eliminate all multiples of 2
    
    
    |  2  |  3 | 5 | 7 | 9 | 11 | 13 | 15 |
    | --- | --- | --- | --- | --- | --- | --- | --- |
    
2. Assign the value of $p$ to the next prime, which is 3, (since  $3 ≤ \sqrt{n}$). Eliminate
all the multiples of 3 to obtain.
    
    
    |  2  |  3 | 5 | 7 | 11 | 13 |
    | --- | --- | --- | --- | --- | --- |

4. When $p = 5$ , the condition $p ≤ \sqrt{n}$ is false as $5 > \sqrt{n}$. Thus, we exit the process, and now all the numbers in the list are prime numbers up to 15.

# Time Complexity

The goal is to compute the number of eliminations took place for a given input n.
For simplicity let’s just assume that every elimination has some cost associated with it (this includes computing the product, comparisons, etc.).

Let’s first see how many eliminations have been taken place for some input n. Recall
we continue the procedure until $p < \sqrt{n}$, so, the primes involved in the procedure are
$\mathbb{P}=\{2,3,5,\ldots,p_m,\ldots ,p_e\}$ 

When $p = 2:$

$$
\begin{align}\left\lfloor\frac{n}{2}\right\rfloor - 1 \quad \text{eliminations made}
\end{align}
$$

$p = 3$: since we already removed all the even multiples, we have:

$$
\begin{align}
\left\lfloor\frac{n}{3}\right\rfloor - 1 - \left\lfloor\frac{n}{2*3}\right\rfloor
\end{align}
$$

$p=5$: there are $\lfloor{n/5}\rfloor$ multiples of 5, from this we need to remove the multiples of 5 which are either divisible by 2 or 3

$$
\begin{align}\left\lfloor\frac{n}{5}\right\rfloor - \left(\left\lfloor\frac{n}{2*5}\right\rfloor + \left\lfloor\frac{n}{3*5}\right\rfloor - \left\lfloor\frac{n}{2*5*3}\right\rfloor \right) - 1\end{align}
$$

$p = 7:$ 

$$
\begin{align}
	&\left\lfloor\frac{n}{7}\right\rfloor - \left(\left\lfloor\frac{n}{2*7}\right\rfloor + \left\lfloor\frac{n}{3*7}\right\rfloor + \left\lfloor\frac{n}{5*7}\right\rfloor \right. \\
	&\left. - \left\lfloor\frac{n}{2*7*3}\right\rfloor - \left\lfloor\frac{n}{2*5*7}\right\rfloor - \left\lfloor\frac{n}{3*5*7}\right\rfloor + \left\lfloor\frac{n}{2*3*5*7}\right\rfloor \right)- 1
\end{align}
$$

We can easily note the connections to $\textbf{inclusion-exclusion principle}$. Let's generalize this to any arbitrary step involving $p_m$.

$p=p_m$

Consider the following sets, $A_{m_1}$= {$x:x$ is a multiple of  $p_m$ and 2}, $A_{m_{2}}$={$x: x$  is a multiple of $p_m$ and 3},  $A_{m_{4}}$={$x:x$  is a multiple of $p_m$ and 5}, $\cdots$ , $A_{m_n}$={$x: x$ is a multiple of $p_m$ and $p_{m-1}$}.

notice there are $\lfloor\frac{n}{p_m}\rfloor$ multiples of $p_n$, but we need remove multiples of $p_m$ which are divisible by either $2, 3, 5,\ldots,$ $p_{m-1}.$ This is exactly same as,

$$
\begin{align}	&\left\lfloor\frac{n}{p_m}\right\rfloor -\left| \bigcup_{i=1}^{n}A_{m_i} \right| -1 \\	&=\left\lfloor\frac{n}{p_m}\right\rfloor -\left( \sum_{i=1}^n\left|A_{m_i}\right| -\sum_{i < j}\left|A_{m_i}\cap A_{m_j}\right| \right. \\	&+ \left. \sum_{i<j<k}\left|A_{m_i}\cap A_{m_j}\cap A_{m_k}\right|-\cdots\ +(-1)^{n-1} \left|A_{m_1}\cap\cdots\cap A_{m_n}\right|\right) -1\end{align}
$$

Thus, for a given $n$, we can write the time complexity as

$$
 T(n) = C \left( \left\lfloor\frac{n}{2}\right\rfloor + \left\lfloor\frac{n}{3}\right\rfloor + \cdots + \left\lfloor\frac{n}{p_e}\right\rfloor -\sum_{p \in \mathbb{P}}\left| \bigcup_{i=1}^{n}A_{m_i} \right| -1 \right) 
$$

where C is the cost per elimination

Here we obtained a more theoretical tighter run time than  $O(n\log \log n)$ counting the exact number of eliminations made. But in fact $T(n) \in  O(n\log \log n)$.