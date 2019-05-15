#!/usr/bin/env python
#
#    Google
#    Copyright (C) 2005-2007  Petko D. Petkov (GNUCITIZEN)
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program; if not, write to the Free Software
#    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

__version__ = '1.0'
__author__ = 'Petko D. Petkov; pdp (architect)'

__doc__ = """
Google (GNUCITIZEN) http://www.gnucitizen.org

 by Petko D. Petkov; pdp (arhictect)
for Python 2.5
"""

import re
import urllib
import urllib2
import logging

class Get(object):
	"""
	Get

	The power of python in a single object
	"""

	def __init__(self):
		self.user_agent = 'User-Agent: Mozilla/5.0 ' \
			+ '(Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.4) ' \
			+ 'Gecko/20070515 Firefox/2.0.0.4'

	def get(self, url):
		"""
		get(url) -> Response

		Open given url and return response.
		"""

		try:
			request = urllib2.Request(url)
			request.add_header('User-Agent', self.user_agent)

			logging.debug('Get.get - getting url ' + url)

			result = urllib2.urlopen(request)

		except: raise RuntimeError('unable to open url')

		return result

class Search(Get):
	"""
	Search

	The power of Google in a single object
	"""

	def search(self, q, start = 0, num = 10):
		"""
		search(q, start = 0, num = 10) -> generator

		Do google web search.
		"""

		url = 'http://www.google.com/xhtml?'
		query = urllib.urlencode({'q':q, 'start':start, 'num':num})

		result = self.get(url + query)
		content = result.read()

		tokens = re.findall(
			'<a\s+accesskey="\d+"\s+href="(.*?)"\s*>(.*?)</a>(.*?)<span class="c2">',
			content)

		results = []

		for token in tokens:
			url = token[0][token[0].index(';u=') + 3:]
			title = token[1]
			excerpt = token[2]

			logging.debug('Search.search - found url ' + url)

			results.append((urllib.unquote(url), title, excerpt))

		return results

class Crawl(Search):
	"""
	Crawl

	The power of Google in a single object
	"""

	def crawl(self, q, depth = 0):
		"""
		crawl(q, depth = 0) -> generator

		Do google web crawl.
		"""

		index = 1
		last_results = None

		while True:
			if index == 1:
				start = 0

			else:
				start = (index - 1) * 10

			try:
				results = self.search(q, start, 10)

			except: continue

			if not results:
				break

			if last_results == results:
				break

			last_results = results

			yield results

			if index == depth:
				break

			index = index + 1

if __name__ == '__main__':
	import os
	import sys
	import time

	import signal
	signal.signal(signal.SIGINT, lambda signum, frame: sys.exit())

	if len(sys.argv) < 2:
		print 'usage:', os.path.basename(sys.argv[0]), 'query'

		sys.exit()

	logging.basicConfig()

	print '#', ' '.join(sys.argv[1:])
	print '# crawls the first 5 pages only (50 results max)'

	g = Crawl()

	for result in g.crawl(' '.join(sys.argv[1:]), 5):
		for entry in result:
			print entry[0]

		time.sleep(1)
