---
title: WP Blogsecurify
author: pdp
date: Sun, 26 Oct 2008 08:09:04 GMT
template: post.pug
---

The [WP Blogsecurify 1.0](/files/2008/10/wp-blogsecurify-1-0.zip) wordpress plugin is out.

## What does it do?

WP Blogsecurify is a security plugin for Wordpress designed to integrate several simple but important security patches for the popular blogging platform. WP Blogsecurify protects your blog by:

* forcing users to login over a secure communication channel
* protecting session identifiers from incidental session leaks
* hiding database errors which could be caused by malfunctioning plugins
* protecting the entire user session from session hijacking and side-jacking attacks

This plugin is designed to be simple and effective. Future versions will protect against SQLI and XSS attacks. We are also planning to integrate WP Blogsecurify with our social media security testing engine.

Keep in mind that the plugin **requires SSL**. If you don't have SSL on port 443 and you are locked out because the plugin is enabled then you have to remove wp-blogsecurify from the `wp-content/plugins` directory in order to allow yourself back in.
