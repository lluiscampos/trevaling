
var logger = require('./logger').dataman;

var fs    = require('fs');
var taffy = require('taffy');

var db_filename = process.env.DATABASE_FILEPATH || './db.json';
var DATABASE = null

var _database_save = function(callback)
{
  fs.writeFile(db_filename, JSON.stringify(DATABASE().get()), 'utf-8', function(err) {
    if (err) {
      callback(err);
    }
    else {
      callback(null);
    }
  })
}

var philae = function(params, callback) {

  if (DATABASE === null) {
    callback(new Error ("Database not initialized"));
    return;
  }

  if ( (params.time === undefined) || (params.lat === undefined) || (params.lng === undefined) ) {
    callback(new Error ("Invalid parameters, object must have keys {time, lat, lng}"));
    return;
  }

  DATABASE().first().trace.push({
    'time': params.time,
    'lat' : params.lat,
    'lng' : params.lng
  });

  _database_save(function(err){
    if (err) {
      callback(err);
    }
    else {
      callback(null);
    }
  })
}

var viewer = function(params, callback) {
  if (DATABASE === null) {
    callback(new Error ("Database not initialized"));
    return;
  }

  callback(null, DATABASE().get());
}

var database_init = function() {
  var contents = {}
  var write_file = false;

  try {
    contents = fs.readFileSync(db_filename, 'utf-8');
  }
  catch (err) {
    contents = {"id": "first-trip", "trace": []};
    write_file = true;
  }
  DATABASE = taffy(contents);

  if (write_file) {
    fs.writeFileSync(db_filename, JSON.stringify(DATABASE().get()), 'utf-8');
    logger.info('new dabatase file created');
  }

  logger.info('dabatase initialized');
}

module.exports = {
  init  : database_init,
  philae: philae,
  viewer: viewer
};
