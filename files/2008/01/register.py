import os
import sys
import select
import pybonjour

try:
	mac = sys.argv[1]

except:
	print 'usage:', os.path.basename(sys.argv[0]), '<mac>'

	sys.exit(1)

def register_callback(sdRef, flags, errorCode, name, regtype, domain):
	if errorCode == pybonjour.kDNSServiceErr_NoError:
		print 'Registered service:'
		print '  name    =', name
		print '  regtype =', regtype
		print '  domain  =', domain

try:
	sdRef1 = pybonjour.DNSServiceRegister(regtype = '_axis-video._tcp',
	                                     port = 80,
					     txtRecord = pybonjour.TXTRecord({'macaddress': mac}),
	                                     callBack = register_callback)

	sdRef2 = pybonjour.DNSServiceRegister(regtype = '_http._tcp',
	                                     port = 80,
					     txtRecord = pybonjour.TXTRecord({'macaddress': mac}),
	                                     callBack = register_callback)
except:
	print 'cannot register DNS service'

	sys.exit(1)

try:
	try:
		while True:
			ready = select.select([sdRef1, sdRef2], [], [])

			if sdRef1 in ready[0]:
				pybonjour.DNSServiceProcessResult(sdRef1)

			if sdRef2 in ready[0]:
				pybonjour.DNSServiceProcessResult(sdRef2)

	except KeyboardInterrupt:
		pass

finally:
	sdRef.close()
