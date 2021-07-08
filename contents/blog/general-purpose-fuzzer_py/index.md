---
title: General Purpose Fuzzer.py
author: pdp
date: Mon, 17 Dec 2007 00:15:42 GMT
template: post.pug
---

Fuzzing is a quite important for security researchers mainly because it helps going through the boring stuff quickly. Generally speaking, fuzzers are tools for automation. Unfortunately most moderns fuzzers are a lot more then automation tools. They are big, bloated and most of all, highly unusable, imho. And if you want to do some fuzzing, first of all you have to learn how they were built, and this is not a trivial thing.

Due to my frustration with modern fuzzers and the simple fact that I need them in my day-to-day work, I decided to write my own in Python, because Python rocks. The fuzzer, which I developed this afternoon, is contained within a single python module. This makes it very portable and easy to use. On the other hand, the fuzzing subroutines do not use anything fancy but the standard python functionalities (generators and closures), which improves the learning curve quite drastically. Last but not least it is really fun to use it from the command line. If you don't trust me, just give it a try. The following is the actual source code of the tool:

    [/files/2007/12/fuzzer.py](/files/2007/12/fuzzer.py)

    When prototyping the fuzzer I realized that I need a very good way to separate generated data from logic. Therefore, I came up with the concepts of generators (the stuff I've used in my [previous work](/blog/web-client-fuzzer_py) on fuzzers) and actuators. Generators simply **yield** data while actuators consume it and do something useful with it. The following is an example of a dummy generator and actuator, also available within the fuzzer source code. Keep in mind that you can input external modules within the fuzzer by using the `-i` or `--import` command line options and as such modularize your work a bit more:

    #
    # GENERATORS
    #
    def generator_dummy(globals):
        """ the dummy generator outputs all numbers between 0 and 99 """

        def run():
            for i in range(0, 100):
                yield i

        return run

    #
    # ACTUATORS
    #
    def actuator_dummy(globals):
        """ the dummy actuator returns all supplied values """

        def run(value):
            return value

        return run

As you can see, very simple stuff really. The simpler the better, I say! Unfortunately, the tool is only self documented (check the usage). There is no other external documentation how to use it. If you are willing to help with putting some basic tutorials together, you are more then welcome. Please, let me know. Of course, credits will be given where are due.

_So, there you go. General Purpose fuzzing can be actually a simple task._
