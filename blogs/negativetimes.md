# Why negative times negative is a positive?

In elementary classes, we learn that the product of two negative numbers is positive. But why does this happen? Take a moment to think about it. 

Let’s consider $3 \times 2$, we can visualize it as $3 \times 2 = 3 + 3$, representing two groups of three, equals 6 or by switching the order, $2 \times 3 = 2 + 2 + 2$, meaning three groups of two also equals to 6.

Let us switch the order, $3 \times (-2)$, see the inability (3 into -2 groups?) to think about this situation as repeated addition. This is exactly the same situation when we try to visualize the product $-3 \times -2$.

This suggests that repeated addition is an informal notion of multiplication, and thus we need a more formal line of reasoning. Reasoning in Mathematics is built upon fundamental statements which are self-evidently true, better known as axioms. For instance, "two distinct points determine a unique line" is an axiom from plane geometry.

There are axioms of algebra that describe how addition and multiplication behave with integers. These axioms are used to prove why certain properties hold. Mathematicians say that integers form a ring structure 💍 under the operations of addition and multiplication. Here is the complete list of ring axioms.

A standard proof of why product of two negative integers is a positive seen in an abstract algebra textbook. This material is written to give the gist of the proof for the curious minds out there. Here are the following axioms and facts (these are provable statements) about integers that will be useful. 
### Axioms and Facts About Integers  
1. **Additive Inverse (Axiom)**: For any integer $a$, the additive inverse of $a$ is the integer $-a$ such that  

   $$ -a + a = 0 $$  

2. **Distributivity (Axiom)**: For any integers $a$, $b$, and $c$, we have  

   $$ a(b+c) = ab + ac $$  
   and  
   $$ (b+c)a = ba + ca $$  

3. **Fact**: Given any integer,  

   $$ a \times 0 = 0 $$  

4. **Fact**: Additive inverse is unique.


The key is to think of negative numbers as additive inverses. For example, \( -2 \) should be seen as the additive inverse of \( 2 \) since  

$$ -2 + 2 = 0. $$  

Similarly, \( -(-2) \) is the additive inverse of \( -2 \). Ask which number added to \( -2 \) gets to \( 0 \)? It’s \( 2 \), so  

$$ -(-2) = 2. $$

Now, let’s jump into it.  

Let us first try to reason out what \( a \times (-b) \) is:  

Consider \( a(-b + b) \), we know as a fact that it is equal to zero. Using distributivity, we have  

$$ a(-b + b) = a(-b) + ab = 0. $$  

Notice \( a(-b) \) when added to \( ab \) gets us to zero. This means \( a(-b) \) is the additive inverse of \( ab \), but the additive inverse is unique, thus  

$$ a(-b) = -(ab). $$

Consider $(-a)(-b + b)$, again we know it's equal to zero.

$$ 
\begin{align*}
(-a)(0) &= (-a)(-b + b) = (-a)(-b) + (-a)b \\
&= (-a)(-b) + -(ab) \\
&= 0
\end{align*}
$$

Here $(-a)(-b)$ is the additive inverse of $-(ab)$. Now, what's the additive inverse of $-ab?$. Ask which
number added to $-ab$ gets to 0. It's $ab$, since $ab + (-ab) = 0$. Thus, it must be the case that
$(-a)(-b) = ab$

The takeaway is that this rule results from extending familiar properties of positive numbers to negative numbers through axioms. Using a chain of reasoning, it can be easily understood.

## References and Further Reading

- Rusczyk, R., Patrick, D., & Boppana, R. B. (2011). *Prealgebra*. Art of Problem Solving (AoPS) Incorporated.  
- Khan Academy. (2012, June 22). *Why a negative times a negative is a positive | Pre-Algebra* [Video]. YouTube.  
  [https://www.youtube.com/watch?v=rK4sXm_MPWo](https://www.youtube.com/watch?v=rK4sXm_MPWo)  
- Fraleigh, J. B. (2014). *Abstract Algebra* (7th ed.). Part IV: Rings and Fields. Addison-Wesley. (Theorem 18.8).
