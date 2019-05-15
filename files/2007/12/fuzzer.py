#    Fuzzer
#    Copyright (C) 2007  Petko D. Petkov (GNUCITIZEN)
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

__version__ = '1.0b'
__author__ = 'Petko D. Petkov; pdp (architect)'

__doc__ = """
Fuzzer (GNUCITIZEN) http://www.gnucitizen.org

fuzzing simplified

 by Petko D. Petkov; pdp (architect)
for Python 2.5
"""

#
# GLOBAL IMPORTS
#
import re
import logging

#
# DICTIONARIES
#
dict_string_values = [
    '.',
    '..',
    '.' * 1000000,
    '%00',
    '%00' * 1000000,
    '\x00',
    '\x00' * 1000000,
    '\x0A',
    '\x0A' * 1000000,
    '\x0D',
    '\x0D' * 1000000,
    '\x0D\x0A',
    '\x0D\x0A' * 1000000,
    '&#x00;',
    '&#x00;' * 1000000,
    '&#x0A;',
    '&#x0A;' * 1000000,
    '&#x0D;',
    '&#x0D;' * 1000000,
    '&#x0D;&#x0A;',
    '&#x0D;&#x0A;' * 1000000,
    '../' * 1000000,
    '..\\' * 1000000,
    "'",
    "'" * 1000000,
    '"',
    '"' * 1000000,
    '>',
    '<',
    '<>',
    '<' + 'A' * 1000000 + '>',
    '&' + 'A' * 1000000 + ';'
    'A' * 1000000,
    "'" + 'A' * 1000000 + "'",
    'A' * 1000000
]

dict_number_values = [
    0,
    -1,
    0x100,
    0x1000,
    0x10000,
    0x100000,
    0xffffffff,
    0xfffffffe,
    0x80000000,
    0x7fffffff,
    0x7ffffffe,
    0x3fffffff
]

dict_meta_characters = [
    '~',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '\\',
    '|',
    ';',
    ':',
    "'",
    '"',
    '<',
    '>',
    ',',
    '.',
    '/',
    '?'
]

dict_special_strings = [
    '..',
    '../',
    '..\\',
    '%00',
    '%0A',
    '%0D',
    '%0D%0A',
    '&#x00;',
    '&#x0A;',
    '&#x0D;',
    '&#x0D;&#x0A;'
]

dict_plain_strings = [
    'A' * 100,
    'A' * 1000,
    'A' * 10000
]

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

#
# MAIN
#
if __name__ == '__main__':
    import os
    import sys
    import getopt
    import urllib

    def usage():
        print 'usage: %s [options] <generator> <actuator>' % os.path.basename(sys.argv[0])
        print '\t-d --dump        dump iteration'
        print '\t-f --filter      filter out matching pattern (default ^$)'
        print '\t-i --import      import external python module'
        print '\t-m --match       matching tempalte'
	print '\t-o --option      custom option (-o name:value)'
        print '\t-s --skip        how many steps to skip (default 0)'
        print '\t-b --block       blog/terminate the fuzzer on match'
        print '\t-h --help        show this screen'
        print '\t-l --list        list available generators'
        print '\t-v --verbose     verbose mode'
        print
        print 'by Petko D. Petkov; pdp (architect)'
        print
        print 'GNUCITIZEN'
	print 'http://www.gnucitizen.org'

        sys.exit()

    SKIP = 0
    DUMP = 0
    MATCH = '^$'
    FILTER = '^$'
    BLOCK = False
    MODULES = []
    OPTIONS = []
    VERBOSE = 50
    ITERATION = 1
    GENERATOR = None
    ACTUATOR = None

    try:
        opts, args = getopt.gnu_getopt(sys.argv[1:], 'd:f:i:m:o:s:bhlv', ['dump=', 'filter=', 'import=', 'match=', 'options=', 'skip=', 'block', 'help', 'list', 'verbose'])

        _i = 0
        _opts = opts

        for opt, val in opts:
            if opt == '-l' or opt == '--list':
                opts.append(opts.pop(_i))

            _i += 1

        for opt, val in opts:
            if opt == '-d' or opt == '--dump':
                try:
                    DUMP = int(val)

                except:
                    raise Exception('dump value not integer')

                if DUMP <= 0:
                    raise Exception('dump value must be greater then 0')

            if opt == '-f' or opt == '--filter':
                FILTER = val

            if opt == '-i' or opt == '--import':
                tokens = val.split('.')

                if len(tokens) == 1:
                    globals()[val] = __import__(val)
                    MODULES.append(val);
                    
                else:
                    globals()[tokens[-1:]] = __import__('.'.join(tokens[:-1]), fromlist=[tokens[-1:]])
                    MODULES.append(tokens[-1:])

            if opt == '-m' or opt == '--match':
                MATCH = val

            if opt == '-o' or opt == '--option':
                try:
                    name, value = val.split(':')

                    OPTIONS.append((name, urllib.unquote_plus(value)))

                except Exception, e:
                    raise Exception("option '%s'" % val + ' - ' + str(e))

            if opt == '-s' or opt == '--skip':
                try:
                    SKIP = int(val)

                except:
                    raise Exception('skip value not integer')

                if SKIP <= 0:
                    raise Exception('skip value must be greater then 0')

            if opt == '-b' or opt == '--block':
                BLOCK = True

            if opt == '-h' or opt == '--help':
                usage()

            if opt == '-l' or opt == '--list':
                gen = []
		act = []

                for name in MODULES:
                    module = globals()[name]

                    for key in dir(module):
                        if key.startswith('generator_') and callable(getattr(module, key)):
                            gen.append((key[10:], str(getattr(module, key).__doc__).strip()))

                        elif key.startswith('actuator_') and callable(getattr(module, key)):
                            act.append((key[9:], str(getattr(module, key).__doc__).strip()))

                globs = globals()
                
                for key in globs.keys():
                    if key.startswith('generator_') and callable(globs[key]):
                        gen.append((key[10:], str(globs[key].__doc__).strip()))

                    if key.startswith('actuator_') and callable(globs[key]):
                        act.append((key[9:], str(globs[key].__doc__).strip()))

                print '--- GENERATORS --'

                for name, doc in gen:
                   print name, '-', doc

                print
                print '--- ACTUATORS--'

                for name, doc in act:
                   print name, '-', doc

                sys.exit()

            if opt == '-v' or opt == '--verbose':
                if VERBOSE > 10:
                    VERBOSE -= 10

        if len(args) == 0:
            raise Exception('no generator specified')

        elif len(args) == 1:
            raise Exception('no actuator specified')

        try:
            for name in MODULES:
                module = globals()[name]

                try:
                    GENERATOR = getattr(module, 'generator_' + args[0])

                except: pass

            if GENERATOR == None:
                GENERATOR = globals()['generator_' + args[0]]

        except:
            raise Exception('generator not found')

        try:
            for name in MODULES:
                module = globals()[name]

                try:
                    ACTUATOR = getattr(module, 'actuator_' + args[1])

                except: pass

            if ACTUATOR == None:
                ACTUATOR = globals()['actuator_' + args[1]]

        except:
            raise Exception('actuator not found')

    except Exception, e:
        print e
        print

        usage()

    logging.basicConfig(level=VERBOSE, format='-- %(levelname)s - %(message)s')
    logging.addLevelName(60, 'ITERATION')
    logging.addLevelName(70, 'MATCH')

    try:
        GENERATOR = GENERATOR(globals())
        ACTUATOR = ACTUATOR(globals())

    except Exception, e:
        print e

        sys.exit()

    GENERATOR = GENERATOR()

    if DUMP > 0:
        for i in range(0, DUMP - 1):
            GENERATOR.next()
            ITERATION += 1

        value = GENERATOR.next()
        
        logging.log(60, ITERATION)
        print value

        sys.exit()

    while True:
        try:
            if SKIP != 0:
               for i in range(0, SKIP):
                   GENERATOR.next()
                   ITERATION += 1

               SKIP = 0

            value = GENERATOR.next()
 
            while re.search(FILTER, str(value)):
                value = GENERATOR.next()
                ITERATION += 1

            logging.log(60, ITERATION)
            logging.debug('<<' + str(value))

            value = ACTUATOR(value)

	    if value != None and re.match(MATCH, str(value)):
                logging.log(70, value)

                if BLOCK:
                    break

            logging.debug('>>' + str(value))

            ITERATION += 1

        except StopIteration:
            break
