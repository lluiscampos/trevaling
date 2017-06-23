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

Once nodejs and npm are installed, install grunt:
```
npm install -g grunt
```

Tip: install nodejs-legacy or create a manual symlink to deal with legacy code expecting "node" to be nodejs on Ubuntu/Debian systems.
```
apt-get install nodejs-legacy
```

## Rosetta

Roseta is an HTML/javascript static frontend to follow the current trevaling.

Install dependencies and build the app:
```
npm install
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

Comet67P is a node.js module responsable for tracking the current trevaling and serving the API with all the data

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

Start application:
```
npm start
```

### environment variables

Comet67p module requires access to your device on [Particle Cloud](https://www.particle.io/) and to [Open Signal API](https://opensignal.3scale.net/login).

Tokens to these APIs shall be provided as environment variables in an .env file or directly on the node.js process:
```
OPEN_SIGNAL_API_KEY=<your_api_key_here>
PARTICLE_CLOUD_TOKEN=<your_token_here>
```

## Philae

Philae is a particle.io firmware that reads network identification information and publish it through the cloud

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
