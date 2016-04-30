
##
# Trevaling Makefile
# Top level wrapper to call each component's build/lint/test targets
###############################################################################

all:: error_clear build _lint _test error_check

lint: error_clear _lint error_check

test: error_clear _test error_check

build: build_comet67p build_rosetta build_philae

_lint: lint_comet67p lint_rosetta lint_philae

_test: test_comet67p test_rosetta test_philae


##
# Meta targets
#########################

comet67p: error_clear build_comet67p lint_comet67p test_comet67p error_check

rosetta: error_clear build_rosetta lint_rosetta test_rosetta error_check

philae: error_clear build_philae lint_philae test_philae error_check


##
# Build commands
#########################

build_comet67p:
	cd comet67p && npm install

build_rosetta:
	cd rosetta && npm install
	cd rosetta && grunt build

build_philae:
	cd philae && make


##
# Lint commands
#########################

lint_comet67p:
	cd comet67p && grunt lint || touch ../error

lint_rosetta:
	cd rosetta && grunt lint || touch ../error

lint_philae:
	cd philae && make lint || touch ../error

##
# Test commands
#########################

test_comet67p:
	cd comet67p && npm run test-cov || touch ../error

test_rosetta:
	cd rosetta && grunt test || touch ../error

test_philae:
	cd philae && make test || touch ../error


##
# Other targets
#########################

error_check:
	test ! -e error

error_clear:
	rm error 2> /dev/null || true

coverage.info: comet67p/coverage/lcov.info rosetta/coverage/lcov.info philae/coverage.info
	lcov -a comet67p/coverage/lcov.info -a rosetta/coverage/lcov.info -a philae/coverage.info -q -o coverage.info

coveralls: coverage.info
	cat ./coverage.info | ./comet67p/node_modules/coveralls/bin/coveralls.js

clean:
	rm coverage.info 2> /dev/null || true
	cd comet67p && grunt clean
	cd rosetta && grunt clean
	cd philae && make clean
