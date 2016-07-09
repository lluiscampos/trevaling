# trevaling

[![Build Status](https://travis-ci.org/lluiscampos/trevaling.svg?branch=master)](https://travis-ci.org/lluiscampos/trevaling)
[![Coverage Status](https://coveralls.io/repos/github/lluiscampos/trevaling/badge.svg?branch=master)](https://coveralls.io/github/lluiscampos/trevaling?branch=master)
[![Dependencies Status](https://david-dm.org/lluiscampos/trevaling.svg)](https://david-dm.org/lluiscampos/trevaling)

Trevaling is about traveling, traveling is about learning, learning is about coding, and coding is about trevaling
```

   PHILAE                             COMET67P             ROSETTA
   _____|--)         _                _________            _________
  |     |          (`  ).            |         |          |         |
  | C++ | <----> (       '`.  <----> | node.js |  <---->  | html/js |
  |_____|        (         )         |_________|          |_________|
                  ` __.:'-'

```

## Requirements

### node ecosystem

Rosetta and Comet67P require node.js v4 or higher. From Ubuntu 16.04 onwards the official Ubuntu repositories can be used:
```
apt-get install nodejs npm
```

For older Ubuntu versions, it is required to use nodesource script:
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install nodejs npm
```

Once nodejs and npm are installed, install grunt and bower:
```
npm install -g grunt bower
```

Tip: install nodejs-legacy or create a manual symlink to deal with legacy code expecting "node" to be nodejs on Ubuntu/Debian systems.
```
apt-get install nodejs-legacy
```

## Rosetta

Install dependencies:
```
npm install
```

Build the app:
```
grunt build
```

Run lint:
```
grunt lint
```

To run the tests open the file test/index.html from a browser.

Alternatively, grunt can be used:
```
grunt test
```

## Comet67P

Install dependencies:
```
npm install
```

Run lint:
```
npm run comet67p_lint
```

Run tests (with coverage):
```
npm run comet67p_test-cov
```

Set the following environment variables in an .env file:
```
OPEN_SIGNAL_API_KEY=<your_api_key_here>
```

Start server:
```
npm comet67p_start
```

## Philae

### Standalone mode on PC

Install dependencies (ubuntu):
```
apt-get install libboost-test-dev lcov vera++
```

Compile with gcc:
```
make
make test
```

### Firmware for particle.io

Install dependencies (ubuntu):
```
npm -g install particle-cli
apt-get install dfu-util openssl
```

Log in into your particle account and compile the firmware:
```
particle cloud login
make particle
```

Flash the device via serial:
```
sudo particle flash --serial bin/firmware_[version].bin
```

## References to documentation

### javascript stack
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
- https://nodejs.org/dist/latest-v4.x/docs/api/

### comet67p libraries and APIs
- http://expressjs.com/en/4x/api.html
- https://github.com/typicaljoe/taffydb
- http://developer.opensignal.com/towerinfo/

### rosetta libraries
- http://underscorejs.org/
- http://backbonejs.org/

### nodejs developement tools
- http://eslint.org/docs/rules/
- https://mochajs.org/
- http://chaijs.com/api/bdd/

### philae
- https://bitbucket.org/verateam/vera/wiki/Rules
- https://docs.particle.io/reference/firmware/electron/
- https://docs.particle.io/reference/javascript/
