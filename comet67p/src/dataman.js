
require('dotenv').config();

var fs    = require('fs');
var taffy = require('taffy');

var db_filename = process.env.DATABASE_FILEPATH || '/tmp/db.json';
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

  if ( !params.hasOwnProperty('time') || !params.hasOwnProperty('lat') || !params.hasOwnProperty('lng') ) {
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

var database_init = function(callback) {
  fs.readFile(db_filename, 'utf-8', function(err, contents) {
    if (err) {
      DATABASE = taffy({"id": "first-trip", "trace": []});
      _database_save(function(err){
        if (err) {
          callback(err);
        }
        else {
          callback(null);
        }
      })
    }
    else {
      DATABASE = taffy(contents)
      callback(null);
    }
  })
}

module.exports = {
  init  : database_init,
  philae: philae,
  viewer: viewer
};
