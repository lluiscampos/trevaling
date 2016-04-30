
##
# Trevaling Makefile
# Top level wrapper to call each component's build/lint/test targets
###############################################################################

all:: clean build _lint _test error_check

travis: build _lint _test coveralls error_check

lint: clean _lint error_check

test: clean _test error_check

build: build_comet67p build_rosetta build_philae

_lint: lint_comet67p lint_rosetta

_test: test_comet67p test_rosetta test_philae


##
# Meta targets
#########################

comet67p: build_comet67p lint_comet67p test_comet67p error_check

rosetta: build_rosetta lint_rosetta test_rosetta error_check

philae: build_philae test_philae error_check


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

coveralls: test
	lcov -a comet67p/coverage/lcov.info -a philae/coverage.info -q -o coverage.info && \
	cat ./coverage.info | ./comet67p/node_modules/coveralls/bin/coveralls.js

clean:
	rm error 2> /dev/null || true
	cd philae && make clean
