
var winston = require('winston');

var log_level = process.env.LOG_LEVEL || 'debug'

const log_formatter = function(options) {
  return options.level.toUpperCase() + ' ' + options.timestamp() + ' ' +
    options.label + ' ' + (options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ?
    '\n\t'+ JSON.stringify(options.meta) : '');
};

const timestamp = function() {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' +
    d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds();
};

let loggers_labels = ['server', 'cell2coords', 'dataman', 'tracker'];

for (let label of loggers_labels) {
  let transports = [
    new (winston.transports.File)({
      name: 'file',
      label: label,
      timestamp: timestamp,
      formatter: log_formatter,
      level: log_level,
      filename: 'fileAll.log',
      json: false,
    }),
    new (winston.transports.Console)({
      name: 'console',
      label: label,
      timestamp: timestamp,
      formatter: log_formatter,
      level: log_level,
      colorize: true,
      json: false,
    })
  ];

  winston.loggers.add(label, {transports: transports});
}

module.exports = {
  'server' : winston.loggers.get('server'),
  'cell2coords' : winston.loggers.get('cell2coords'),
  'dataman' : winston.loggers.get('dataman'),
  'tracker' : winston.loggers.get('tracker')
}
