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

## Shared requirements

Need to install node.js v0.12

Install in Ubuntu:
```
curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
```

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
## comet67p

Install dependencies:
```
npm install express
npm install --production taffy
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
