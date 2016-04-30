
all:: clean lint_comet67p lint_rosetta test_comet67p test_rosetta error_check

travis: build lint_comet67p lint_rosetta test_comet67p test_rosetta coveralls error_check

build:
	cd comet67p && npm install
	cd rosetta && npm install

lint: clean lint_comet67p lint_rosetta error_check

test: clean test_comet67p test_rosetta error_check

comet67p: clean lint_comet67p test_comet67p

rosetta: clean lint_comet67p test_comet67p

lint_comet67p:
	cd comet67p && ./node_modules/.bin/eslint server.js || touch ../error

lint_rosetta:
	cd rosetta && ./node_modules/.bin/eslint www/js/app.js || touch ../error

test_comet67p:
	cd comet67p && npm run test-cov || touch ../error

test_rosetta:
	cd rosetta && grunt mocha_phantomjs || touch ../error

error_check:
	test ! -e error

coveralls: test
	lcov -a comet67p/coverage/lcov.info -a philae/coverage.info -q -o coverage.info && \
	cat ./coverage.info | ./comet67p/node_modules/coveralls/bin/coveralls.js

clean:
	rm error 2> /dev/null || true

.PHONY: all travis lint test comet67p rosetta error_check coveralls clean
