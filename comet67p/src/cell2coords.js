
var request = require('request');
require('dotenv').config();

convert = function(params, callback) {

  //TODO: Throw an error if the key is not present
  var apikey = process.env.OPEN_SIGNAL_API_KEY;

  var url = 'http://api.opensignal.com/v2/towerinfo.json?cid=' + params.cid + '&lac=' + params.lac +'&apikey=' + apikey;
  request(url, function (error, response, body) {
    if (error) {
      callback(new Error('request returned error ' + error))
    }
    else if (response.statusCode != 200) {
      callback(new Error('API call returned status code ' + response.statusCode))
    }
    else {
      obj = JSON.parse(body);
      //TODO: Do not asume tower1
      callback(null, {lat: obj.tower1.est_lat, lng: obj.tower1.est_lng})
    }
  })
};

module.exports = convert;
