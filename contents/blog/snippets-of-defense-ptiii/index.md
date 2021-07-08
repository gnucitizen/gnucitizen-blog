---
title: Snippets Of Defense Pt.III
author: mario-heiderich
date: Sat, 20 Oct 2007 08:47:10 GMT
template: post.pug
---

This article is part of a series of posts about small and easy to understand code fragments you can use on your site for protection against certain kinds of attacks. Also this series is targeted to help you understand better what tricks are used by attackers to break into your site and how to avert them. If you have a Snippet of defense yourself and you want to share it, feel free to [contact us](http://www.gnucitizen.org/contact). Self-defense with a Walking-stick.

## The snippet - sanitize your input recursively

This time we are going to show a PHP snippet which you can use to filter your input recursively - working for PHP4 and PHP5 and being pretty copy&paste ready. Furthermore, the snippet shows how you can defeat XSS on your application without being too aggressive and not forbidding the user to use certain characters. Several large applications use this method or similar ones - although, of course, it is not suitable for all platform out there.

You can use this snippet to secure existing applications by embedding it via [auto_prepend_file](http://php.net/manual/en/ini.core.php) or using it at a centralized position in your application's index.php. It doesn't rely on any external software or extensions so it should be running fine on most PHP environments without any problems. And of course don't use it sightlessly - but that goes for all snippets of this series.

```php
<?php
    /**
     * Initial filter method
     *
     * @param array $to_filter
     * @return array
     */
    function filter($to_filter) {
        if (!empty($to_filter)) {
        	foreach ($to_filter as $key => $value) {
            	$filtered[$key] = iterate($key, $value);
            }
        }
        return $filtered;
    }

    /**
     * Iterates recursively of the array to 
     * be filtered
     *
     * @param string $key
     * @param string $value
     * @return mixed
     */
    function iterate($key, $value) {
    	if (!is_array($value)) {
            if (is_string($value)) {
                $filtered[$key] = sanitize($value);    
            }
        } else {
            foreach ($value as $subKey => $subValue) {
                $filtered[$key][$subKey] = sanitize($subValue);
            }
        }
        return $filtered[$key];
    }

    /**
     * The sanitization method
     *
     * @param string $string
     * @return string
     */
    function sanitize($string) {

    	$search = array('"', "'");
    	$replace = array('"', '''); // &rdquo; and &rsquo; are used here

    	/**
    	 * Remind that the replacement is just one way of many.
    	 * You can also use html_special_chars() or htmlentities() - but 
    	 * don't forget the third parameter :)
    	 */
    	return strip_tags(str_replace($search, $replace, $string)
    }

    /**
     * overwrite the original request array with the filtered one
     */
    $_REQUEST = filter($_REQUEST);
?>
```

_We hope that you enjoy the trick  - please tell us what you think. Till the next time._
