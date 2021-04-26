---
title: Hacking with ML
author: pdp
date: Mon Apr 26 2021 16:10:45 GMT+0100 (British Summer Time)
template: post.jade
---

Let's say that we want to train an ML model to hack web applications. What would that look like in practice? Let's do this thought experiment.

We first need to define an environment where the agent (the ML model) can operate and essentially learn. In principle, this would necessitate boiling down the process of web hacking into a limited number of inputs that the agent needs to send in some combination and get rewarded for in return (let's think of this from the perspective of reinforcement learning).

For this thought experiment, let's consider that the input is just three buttons (think of them as a game controller) which the agent can press to manipulate the environment. The agent will smash the buttons, and in return, it may get some reward for finding a vulnerability or getting pretty close to it (novelty-based reward system).

To make this more interesting, the agent also needs to pick up some environmental heuristics (let's call these sensors). Let's keep it simple and concentrate on the URL only. We start by eliminating the domain and the protocol and focus on the URL path and query. Each part of the path can be split into tokens, and each token encoded into a numeric value from a dictionary. The URL query follows the same transformation. Each parameter is encoded into a numeric value from a dictionary, and the query value can be encoded into several parameters representing the type, length, complexity score, etc.

Now we have a vector of values, but we are far from done yet. Let's imagine that the 3-button controller is used to perform the following operations: button A and B are for moving left and right, and button C is for changing the letter (rotating forward, i.e. D becomes E) under the cursor. This information also needs to be encoded into the vector, so we need a value for the cursor position.

Up to this point, we have an environment (the game), the input, the sensors and some reward system, whatever that may be. The next step is to train the model by allowing the agent to operate inside the environment.

If we let the agent loose, given enough time (infinite monkey theorem), we should start seeing results. In theory, if our model is built to purpose, the agent will not be entirely random, but it will perform actions with some level of intuition available due to the connections in the neural net. However, it is also possible to teach the model by providing good and bad examples. In other words, human input is required to show how to operate in the environment effectively and, as a result, speed up the training process significantly.

And just like that, we might have an ML model that hacks, limited to this specific problem domain. While it may not beat web application scanners in terms of depth, I believe it has a chance of discovering novel hacking techniques as long as they are related to input validation. Anything that requires more complex interactions, such as opening separate sessions, figuring out out-of-band attacks, etc., would significantly increase the number of parameters and complicate the model unless a more generalised learning environment is invented.
