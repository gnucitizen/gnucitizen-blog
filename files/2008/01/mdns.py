#!/usr/bin/env python
#
#    mDNS
#    Copyright (C) 2008  Petko D. Petkov (GNUCITIZEN)
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
mDNS (GNUCITIZEN) http://www.gnucitizen.org

 by Petko D. Petkov; pdp (arhictect)
for Python 2.5

requires bonjour for Mac, Windows, Lunux
"""

import select
import logging
import pybonjour

def browse(regtype, domain=None, browse_timeout=5, resolve_timeout=5):
	results = []
	resolved = []

	def resolve_callback(sdRef, flags, interfaceIndex, errorCode, fullname, hosttarget, port, txtRecord):
		if errorCode == pybonjour.kDNSServiceErr_NoError:
			results.append({'name': fullname.strip(), 'host': hosttarget.strip(), 'port': port, 'txtRecord': txtRecord.strip()})
			resolved.append(True)

	def browse_callback(sdRef, flags, interfaceIndex, errorCode, serviceName, regtype, replyDomain):
		if errorCode != pybonjour.kDNSServiceErr_NoError:
			return

		if not (flags & pybonjour.kDNSServiceFlagsAdd):
			# Service removed
			return

		resolve_sdRef = pybonjour.DNSServiceResolve(0, interfaceIndex, serviceName, regtype, replyDomain, resolve_callback)

		try:
			while not resolved:
				ready = select.select([resolve_sdRef], [], [], resolve_timeout)

				if resolve_sdRef not in ready[0]:
					# Resolve timed out
					break

				pybonjour.DNSServiceProcessResult(resolve_sdRef)

			else:
				resolved.pop()

		finally:
			resolve_sdRef.close()

	browse_sdRef = pybonjour.DNSServiceBrowse(regtype=regtype, domain=domain, callBack=browse_callback)

	try:
		while True:
			ready = select.select([browse_sdRef], [], [], browse_timeout)

			if not ready[0]:
				break

			if browse_sdRef in ready[0]:
				pybonjour.DNSServiceProcessResult(browse_sdRef)

			_results = results

			for result in _results:
				yield result

				results.remove(result)

	finally:
		browse_sdRef.close()

def register(regtype, port, name=None, domain=None, host=None, txtRecord='', register_timeout=5):
	results = []

	def register_callback(sdRef, flags, errorCode, name, regtype, domain):
		if errorCode == pybonjour.kDNSServiceErr_NoError:
			results.append({'name': name.strip(), 'regtype': regtype.strip(), 'domain': domain.strip()})

	sdRef = pybonjour.DNSServiceRegister(regtype=regtype, port=port, name=name, domain=domain, host=host, txtRecord=txtRecord, callBack=register_callback)

	try:
		while True:
			ready = select.select([sdRef], [], [], register_timeout)

			if not ready[0]:
				break

			if sdRef in ready[0]:
				pybonjour.DNSServiceProcessResult(sdRef)

			_results = results

			for result in _results:
				yield result

				results.remove(result)

	finally:
		sdRef.close()

def quick_register(regtype, port, name=None, domain=None, host=None, txtRecord='', register_timeout=5):
	results = []

	for record in register(regtype, port, name, domain, host, txtRecord, register_timeout):
		results.append(record);

	return results[0]

if __name__ == '__main__':
	import os
	import sys
	import getopt

	import signal
	signal.signal(signal.SIGINT, lambda signum, frame: sys.exit())

	ACTION = None
	REGTYPE = None
	PORT = None
	NAME = None
	DOMAIN = None
	HOST = None
	TXTRECORD = ''
	TIMEOUT1 = 5
	TIMEOUT2 = 5
	ITERATIONS = 1

	def usage():
		path = os.path.basename(sys.argv[0])

		print 'usage: %s [options]' % path
		print '\t-a --action        action type'
		print '\t-d --domain        domain'
		print '\t-H --host          host'
		print '\t-i --iterations    iterations (default %d)' % ITERATIONS
		print '\t-n --name          name'
		print '\t-p --port          port'
		print '\t-r --record        txtRecord'
		print '\t-t --type          record type'
		print '\t-T --timeout       operation timeout (default %d, register, browse)' % TIMEOUT1
		print '\t-u --utimeout      secondary timeout (default %d, resolve)' % TIMEOUT2
		print '\t-h --help          show this screen'
		print
		print 'actions:'
		print '\tB                  - browse mDNS'
		print '\tR                  - register new mDNS entity'
		print
		print 'types:'
		print '\t_printer._tcp'
		print '\t_pdl-datastream._tcp'
		print '\t_ipp._tcp'
		print '\t_http._tcp'
		print '\t_ftp._tcp'
		print '\t_telnet._tcp'
		print '\t_ssh._tcp'
		print
		print 'examples:'
		print '\t%s -aB -t _pdl-datastream._tcp' % path
		print '\t%s -aR -t _test._pdl-datastream._tcp -p 1900 -i 10' % path
		print
		print 'GNUCITIZEN'
		print 'Petko D. Petkov; pdp (architect)'

		sys.exit()

	try:
		opts, args = getopt.gnu_getopt(sys.argv[1:], 'a:d:H:i:n:p:r:t:T:u:h', ['action=', 'domain=', 'host=', 'iterations=', 'name=', 'port=', 'record=', 'type=', 'timeout=', 'utimeout=', 'help'])

		for opt, val in opts:
			if opt == '-a' or opt == '--action':
				if val not in ['B', 'R']:
					raise Exception("action '%s' not found" % val) 

				ACTION = val

			if opt == '-d' or opt == '--domain':
				DOMAIN = val

			if opt == '-H' or opt == '--host':
				HOST = val

			if opt == '-i' or opt == '--iterations':
				try:
					ITERATIONS = int(val)

				except:
					raise Exception("the value of '%s' is not integer" % opt)

			if opt == '-n' or opt == '--name':
				NAME = val

			if opt == '-p' or opt == '--port':
				try:
					PORT = int(val)

				except:
					raise Exception("the value of '%s' is not integer" % opt)

			if opt == '-r' or opt == '--record':
				TXTRECORD = val

			if opt == '-t' or opt == '--type':
				REGTYPE = val

			if opt == '-T' or opt == '--timeout':
				try:
					TIMEOUT1 = val

				except:
					raise Exception("the value of '%s' is not integer" % opt)

			if opt == '-u' or opt == '--utimeout':
				try:
					TIMEOUT2 = val

				except:
					raise Exception("the value of '%s' is not integer" % opt)

			if opt == '-h' or opt == '--help':
				usage()

		if not ACTION:
			raise Exception('not action specified')

		if ACTION == 'B':
			if not REGTYPE:
				raise Exception("action 'B' requires option '-t'")

		if ACTION == 'R':
			if not REGTYPE:
				raise Exception("action 'R' requires option '-t'")

			if not PORT:
				raise Exception("action 'R' requires option '-p'")

	except Exception, e:
		print e
		print

		usage()

	try:
		if ACTION == 'B':
			for record in browse(REGTYPE, DOMAIN, TIMEOUT1, TIMEOUT2):
				print 'record:'
				print '\tname: %s' % record['name']
				print '\thost: %s' % record['host']
				print '\tport: %s' % record['port']
				print '\ttxtRecord: %s' % record['txtRecord']

		if ACTION == 'R':
			for i in range(0, ITERATIONS):
				record = quick_register(REGTYPE, PORT, NAME, DOMAIN, HOST, TXTRECORD, TIMEOUT1)

				print 'record:'
				print '\tname: %s' % record['name']
				print '\tregtype: %s' % record['regtype']
				print '\tdomain: %s' % record['domain']

	except Exception, e:
		print e
