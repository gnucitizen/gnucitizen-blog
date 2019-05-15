---
title: Think Inside The Box First
author: pdp
date: Wed, 15 May 2019 05:00:00 GMT
template: post.jade
---

As you grow up and mature you start asking yourself the bigger questions: "how do I concentrate on the right things", "am I wasting my time on this thing" and "is this really for me". These are common questions, I imagine almost every human being is thinking about at some point in their lives.

I would like to offer a technical solution to how I trained myself to deal with these questions in the search for a better personal system that yields high returns. I admit that this thinking process comes naturally to me but not because I was born and brought up this way, but mostly because I was trained to think like this in my professional life as a penetration tester and vulnerability researcher.

This method of thinking can be essentially mastered by anyone and I promise that although it may look boring and needless at first, it is, in fact, a highly productive tool you will find applying to all kinds of things to ensure that your goals are not accidentally sabotaged by auto-reasoning, which is what our brains mostly do 99% of the time.

## How Information Security People Think

When you reporting vulnerabilities, writing reports after you did penetration testing or simply managing your organization's cyber risk, you tend to think in terms of a 3-dimensional matrix composed of the following axes: **Impact**, **Probability** and **Difficulty**. When you plot a finding against this matrix you get the overall risk score which helps you identify what needs to be fixed first. It is a system designed to ensure nothing is missed and priorities are set correctly in order to minimize the overall cybersecurity risk posture.

```
+ + + + + + + + + + + + +
+\                      +\
+ \                     + \
+  \                    +  \
+   \                   +   \
+    + + + + + + + + + +++ + +
+    +                  +    +
+    +  Difficulty      +    +
+    +                  +    +
+    +                  +    +
+    +                  +    +
+    +                  +    +
+ + +++ + + + + + + + + +    +
 \   +                   \   +
  \  +                    \  + Impact
   \ +                     \ +
    \+                      \+
     + + + + + + + + + + + + +
     Probability
```

You can also find the same matrix in its 2-dimensional form with Impact and Probability as the only axes.

```
     + + + + + + + + + + + + +
     +                       +
     +                       +
     +                       + Impact
     +                       +
     +                       +
     + + + + + + + + + + + + +
     Probability
```

I do believe, however, that thinking in 3 dimensions gives you better results. The 2 dimensions are way too binary. It is in effect a method of sorting risks based on the product of two numbers: Impact and Probability most of the time. In 3 dimensions the combination of any two axes gives you sorting while the 3rd-one gives you a differentiation factor that tilts the thinking process towards some sort of hypothesis.

For example, a Remote Code Execution vulnerability is high impact and relatively easy to exploit but the probability is low because it affects an internal system that sits in a trusted network. Without the 3rd-dimension we would think that this issue requires immediate attention. With all axes at hand, we can actually evaluate the risk properly and realize that this is not that important.

Truth to be told, during my last pentesting gig I was accustomed to using a 4-dimensional matrix which was the product of Difficulty, Probability, Impact, and Controls. The 4th axis **Controls** was accounting for the mitigation controls already in place.

## Be Inside The Box to Think Outside The Box

The same thinking process is not only applicable to managing vulnerabilities and cybersecurity risks but also in every-day life scenarios. Now I am not saying that you should apply this process when buying tomatoes from the local grocery store. This is a system of control (just like in the Matrix movie) to help you account for the real things that are important. It helps you set priorities and maximize returns.

This system is the method of thinking inside the box (a 3-dimensional cube) to help you think outside of the box (everything else). It is the system to force us to use our brains and not our gut fillings as we usually do. You can also say that this is the system to help you think like a hacker as this is what I learned as a penetration tester.

The system boils down to the following procedure:

1. **Write down all the things that you can think of** - short, mid and long term goals.
2. **Plot the things in the 3d cube using the axes** - impact, probability, and difficulty.
3. **Create a priority list based on 2 of the axes** - mostly likely impact and probability
4. **Filter or sort based on the remaining axis** - most likely difficulty

This process can be repeated as often as required regardless of whether you are tackling micro or macros goals and problems. The zoom level does not really matter that much.

You may think that simply getting the product of all numbers will give us a definitive list that is in the right priority order but I argue that most of the time this is simply not the case.

The reason it is best to get the product of two of the axes first and then sort by the 3rd is explained in what follows next.

## Low-hanging Fruit

Having all things that matter plotted in our cube we can start thinking in terms of the low-hanging fruit. The low-hanging fruit is the things that are relatively easy to do and have a high-level of return.

In terms of our 3rd representation, the definition of low-hanging fruit is the product of **Impact** and **Probability** with low **Difficulty**. In other words, this is the product of anything that will be impactful to us in a positive or negative way with a relative degree of certainty and still easy to do.

Depending on your strategy you might want to tackle these first. I would not say that this is always the best way. It depends on personal circumstances or other external factors. In fact, some sort of balance is perhaps best.

Some people in the business world refer to this category (i.e. the low-hanging fruit) as "get the basics done" category of problems. Of course, "the basics" does not have a formal definition. It is just a gut thing. With this system, we can formally define and explain what the "basics" are.

For example, a CISO (Chief Information Security Officer) is likely going to concentrate on Role-based Access Controls, Patch-management, and Policies when they join a new organization and these are going to be their basics. This is also the low-hanging fruit. All of these things are relatively easy to do but have a high impact in a positive way to the organization. This not necessary might be the thing they were hired for. Thus our representation can be used to identify this oversight quite clearly.

At a personal level, you might concentrate on things such as planning family time, learning new things or simply taking care of your financial and accounting. Again, planning family trips is a high positive impact, high probability of a positive outcome and relatively easy to do - i.e. a low-hanging fruit. But if we do family trips all the time this is going to be great from a personal perspective but long-term will have a negative effect on other parts of our lives and we are most likely going to miss on the big things. Hence you should use the 3rd axis as a way of dividing equal time on the easy and the difficult things so that we have a balanced life.

## Positive and Negative Thinking

In risk management, it is all about negative impacts, i.e. what can happen if we don't do this or that. Most of the time this is associated with some sort of financial loss. **Impact** is the axis that deals with this domain.

Though, not everything is about loss. In fact, a lot of the time it is also about gains. The impact, in that case, is a representation of a positive value, i.e. something that will reflect positively on us and our organizations rather than negatively. In risk management, these scenarios are rarely accounted for as risk is perceived as something negative.

Realizing and understanding this duality is important. However, we don't need to think about it too much if we simply apply basic math. For example, Impact could be either a positive number or an equal negative number. The product of a positive and a negative number is negative so the minus sign represents a negative outcome while a plus sign represents a positive outcome.

It is pretty trivial you might think but you will find that this is almost never used in real life - especially not in business. I have not seen in my long career in cybersecurity a single organization that expresses risk and opportunities with the same tool. In fact, I am not sure what is the opposite of risk management. I suppose opportunity-management?

It is kind of interesting to think of what does zero represents - i.e. the neutral position. Obviously, any number multiplied by zero will give you zero. And I suppose anything that has zero impact are the things that are simply not worth doing. Putting it differently no impact is idleness. Think about that you may find other ways to describe it.

Now that we know how to express Impact in a positive and negative way we have a natural mechanism of categorizing risks and opportunities. In my mind, both of them are equal in nature and I guess some people will tend to do more of the risks and loss of opportunities and the other way around. It doesn't matter what kind of person you are, what matter is that you can explain your decisions and you are conscious about your tendencies.

## The Proof of Concept (PoC)

It is time to do your own PoC and find if this method works for you. Layout your goals, evaluate them based on **Impact**, **Probability** and **Difficulty** and apply some strategic reasoning to find out what is worth doing more of and what should be placed in the backlog. Do it as frequently as required.

I get distracted daily so having a daily reminder of what is at stake with weekly follow up reviews is what works best for me but you are different. Over time this process becomes second nature.

One positive side-effect is that although you will find that you are doing less of the things that you will consider impulsive and fun, you will not really mind it that much. It is not something will think of as a thing missing in your life.
