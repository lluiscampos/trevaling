
var request = require('request');
require('dotenv').config();

var convert = function(params, callback) {

  if ( (params.cid === undefined) || (params.lac === undefined) ) {
    callback(new Error ("Invalid parameters, object must have keys {cid, lac}"));
    return;
  }

  var apikey = process.env.OPEN_SIGNAL_API_KEY || 'OPEN_SIGNAL_API_KEY';

  var url = 'http://api.opensignal.com/v2/towerinfo.json?cid=' + params.cid + '&lac=' + params.lac +'&apikey=' + apikey;
  request(url, function (error, response, body) {
    if (error) {
      callback(new Error('request returned error ' + error))
    }
    else if (response.statusCode != 200) {
      callback(new Error('API call returned status code ' + response.statusCode))
    }
    else {
      var obj = JSON.parse(body);
      if (obj.hasOwnProperty('tower1')) {
        callback(null, {lat: obj.tower1.est_lat, lng: obj.tower1.est_lng})
      }
      else if (obj.hasOwnProperty('towers') && obj.towers === "No towers with these identifiers") {
        callback(new Error(obj.towers))
      }
      else {
        callback(new Error('Unable to parse coordinates information from responose ' + body))
      }
    }
  })
};

module.exports = convert;
