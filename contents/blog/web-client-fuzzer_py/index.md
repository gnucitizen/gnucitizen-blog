---
title: Web Client Fuzzer.py
author: pdp
date: Wed, 24 Oct 2007 22:00:50 GMT
template: post.jade
---

"Fuzzing - such a wonderful concept". I wish it worked more often usual. Anyway, here is my attempt to put down a fuzzer for testing various web client specific issues. The fuzzer is written in python and I am not aware of any other tool that fuzzes the way I do, although I must admit, haven't researched enough. I found most of the tools out there kind of **over complicated**. I guess, we've lost the ability to write simple and effective software.

Before going further I need to mention a few things about my motivation to write a fuzzer. The reason behind it is [Hamachi](http://www.metasploit.com/users/hdm/tools/hamachi/hamachi.html). Hamachi is incredibly good tool but, IMHO, it does it in the wrong way - "or maybe I am doing it the wrong way; it is up to you to decide". Hamachi is a fuzzer that uses exclusively JavaScript for fuzzing the DOM and all other associated components.

> The problem with using just JavaScript is that it is very much **unreliable**. JavaScript for HTML is not designed to be procedural. It is event based. This is the reason why the browser hangs when you put it through some humongous loops.
> 
> Also, while in these loops, the browser can and will potentially eat all your memory due to various memory leaks. This may result into unexpected crashes and various other unrelated issues (false positives) which you cannot easily filter through.
> 
> Last but not least, you may not know what exactly caused the crash or the bug to occur. Hamachi sends requests to a remote server which logs all the events. This is cool, but again, you may end up with a couple of things to try before figuring out what exactly was the cause for the unexpected behavior.

For these reason, I decided that fuzzing the browser with one huge blob of JavaScript is not efficient, not even as customizable as I would like it to be, and not as simple as it really should be. So instead of using JS to fuzz the DOM, I instruct the browser to repeatedly connect to a server and fetch a new test until no more tests are available. In order to achieve that, I had to write a server, an engine for launching tests and provide some dictionaries everyone can make use of. Believe me, it is easier then it sounds. Here follows the code of the fuzzer:

    [/files/2007/10/fuzzer.py](/files/2007/10/fuzzer.py)

    Notice that the actual fuzzer is not more then 20 lines of code. The rest is just dictionaries, some demo tests and of course, the synthetic sugar for the command line options. The concepts involved into this tool are based around the idea of writing test cases. I simply call them generators. A generator is a function which is prefixed with **generator_** and does not return but yields stuff out. An example of a generator is the function defined bellow:

    def generator_ff_javascript():
        """ discover arbitrary Sandboxes in Firefox """

        global ITERATION

        for tag in dict_tags:
            for attribute in dict_attributes:
                logging.info('''<%s %s="javascript:dump(%d + '--' + this + '\\n')"></%s>''' % (tag, attribute, ITERATION, tag))
                yield '''<%s %s="javascript:dump(%d + '--' + this + '\\n')"></%s>''' % (tag, attribute, ITERATION, tag)

    I used the above test case in order to discover hidden sandboxes in FF. Firefox is full of little wonders. It seams that elements like **img** does execute JavaScript after all. However, this javascript is located inside a sandbox which does not have access to external methods such as **alert**. Therefore, the JavaScript execution is invisible to the naked eye. However, if you simply do something like this:

    <img src="javascript:throw this"/>

... you will see what I am talking about. The generator that I wrote in order to find all elements that have these hidden sandboxes, does nothing more, but to go through each element in the dictionary and then each attribute. For each combination, the method yields HTML text which records the magic inside the Firefox command line console (i.e `firefox.exe -console`). If you want to write more fuzz test cases, follow the template from above and you won't get it wrong. The fuzzer contains some builtin generators you can learn from.

From the command line you can do a lot of things with the fuzzer. You can bind it to specific port and IP address. You can skip steps, like when you discover a crash at iteration 145, you might want to continue the next time from 146 (it makes sense). You can filter out stuff based on simple regular expressions. You can dump the iterations. You can supply a different template (the mechanism that instructs the browser to refresh and get the next combination). You can specify the verbosity level. You can also list available generators that are currently present inside the test file. This sort of mechanism guarantees that over time you will build some kind of history of your work (i.e. you can refer back to your generators or use them in some other test cases).

Btw, point your browser to `http://**your_host**:**your_port**/fuzzing` in order to start the fuzzing process.

I guess some kind of proper documentation is really needed to show the true power and simplicity of the fuzzer. Though, it is just a tiny tool when compared to most fuzzing frameworks but it has done some great stuff for me in the past. So, learn from the command line. Read the source.

_Please, let me know if you have any suggestions, corrections or recommendations. If you want to improve on it, I have 3 words for you: Keep it Simple!_
