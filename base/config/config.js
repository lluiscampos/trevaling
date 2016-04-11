var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'base'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/philaedb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'base'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/base-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'base'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/base-production'
  }
};

module.exports = config[env];
