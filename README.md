# trevaling

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

### particle.io ecosystem

For Philae... [TODO]


## Rosetta

Install dependencies:
```
npm install
bower install
```

Build the app:
```
grunt bowercopy
```

Run lint:
```
grunt jshint
```

## Comet67P

Install dependencies:
```
npm install
```

## Philae

Install dependencies (ubuntu):
```
apt-get install libboost-test-dev lcov
npm -g install particle-cli
```

Compile with gcc:
```
make
make tests
```

Compile for particle:
```
particle compile electron app.ino philae.cpp philae.h --saveTo firmware.bin
```

Flash the device via serial:
```
sudo particle flash --serial firmware.bin
```
