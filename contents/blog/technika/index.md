---
title: Technika
author: pdp
date: Wed, 31 Jan 2007 22:37:26 GMT
template: post.jade
---

Technika is a general purpose scripting platform for Firefox. It acts like a standard OS shell scripting environment. You can script everything from the currently viewed page, just like Greasemonkey, and everything in the chrome, just like any browser extensions but without need to restart the browser every time you make a change. The platform will be used as a base component to other projects, such as TSF (Technika Security Framework) and [AttackAPI](/blog/attackapi) browser extension.

Technika scripts are very simple and have great code reuse characteristics. Command line option parsing is handled automatically. These options are in the format of URL queries (i.e `print text=Text`). This mechanism allows you to perform some interesting shell tricks and it also significantly minimizes the size of your scripts' sources, since you don't have to do any parsing whatsoever.

Technika supports some useful shell primitives. For example, text enclosed in backticks (`) will be evaluated as JavaScript inside the requested script sandbox. Text that starts with @ (single at sign) is substituted with local scope variable, while @@ (double at sign) is substituted with global chrome variables. You can also use the standard bash << EOF primitive to pass long blocks of text.

You can extend the shell with your own scripts by adding additional paths into Technika's PATH global preference. Your paths can be even located on remote machines as well. Technika will dynamically download your scripts and execute them for you. In order to extend the path, simply do the following from the shell: `path add=url`

For more information check the path script help.

## Scripts

The following scripts come by default with the Technika install: `chars, clear, get, getpref, geturl, gnucitizen, help, hist, js, launch, note, path, posturl, print, prompt, reset, session, set, setpref, source, write`.

## Examples

	print text=`new Date().getTime()`

executes script 'print' and supplies option 'text' with the current timestamp.

	print text=@location

prints the current location of the selected browser tab.

	print text=@@location

prints the location of the browser chrome.

	geturl url=@location&@location=http://www.gnucitizen.org

overwrites the selected browser tab location with the value of 'http://www.gnucitizen.org' and retrieves the url content

```javascript
js date=`new Date().getTime()` << EOF
    for (var i = 0; i < 10; i++) {
        print(i + ': ' + date);
    }
EOF
```

executes the js script with one parameter 'date' which contains the current timestamp. The script input is located between << EOF and EOF delimiters.

## Bookmarklets

Technika is very suitable for writing bookmarklets and automating common web tasks. Once you install/write your bookmarklet you can tag is as an autorun script, which will instruct Technika to execute it every time you visit a page or predefined set of pages. The following list summarizes all Technika tags/keywords. You have to supply these in your bookmarklet's keywords under the properties dialog. Tags are separated by commas:

	autorun - run the script on page load
	level0, level1... level9 - set the execution order of autorun scripts

Technika's bookmarklet features integrate well with Firebug. You can use Firebug's console to write, test and export bookmarklets. You can also run the bookmarklets from the Firebug's shell by prefixing your command line with the hash (#) sign (i.e. #myBookmarklet). If you want to persist some of the data, use Firefox, IE or Opera persistent objects. Your bookmarklets portability depend entirely on your design.

**UPDATE 2011/04/20**: this project has been unsupported/unmaintained for quite some time. You might want to check [Weaponry](http://weaponry.gnucitizen.org) or [Websecurify](http://www.websecurify.com) for better solutions. Alternatively, if you feel like supporting the project, please do let us know.
