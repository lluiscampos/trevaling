
var fs = require('fs');
var TAFFY = require('taffy');
// load json file with db
var myData = require('../db.json');

var jsondb = JSON.stringify(myData);
var db = TAFFY(''+jsondb);


var philae = function(params, callback) {

  db.insert(
    params,
    function(err) {
      if(err){
        callback(new Error("Database returned error " + err));
      }
    }
  );

  try {
    fs.writeFileSync("../db.json", JSON.stringify(db().get(), null, 4));
  }
  catch (err) {
    callback(new Error("Filesystem returned error " + err));
  }

  callback(null);

}

var viewer = function(params, callback) {
  callback(null, db().get());
}

module.exports = {
  philae: philae,
  viewer: viewer
};
