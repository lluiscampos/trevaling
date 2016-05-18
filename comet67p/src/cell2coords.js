
var request = require('request');
require('dotenv').config();

convert = function(params, callback) {

  //TODO: Throw an error if the key is not present
  var apikey = process.env.OPEN_SIGNAL_API_KEY;

  var url = 'http://api.opensignal.com/v2/towerinfo.json?cid=' + params.cid + '&lac=' + params.lac +'&apikey=' + apikey;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      obj = JSON.parse(body);
      //TODO: Do not asume tower1
      callback({lat: obj.tower1.est_lat, lng: obj.tower1.est_lng})
    }
    else {
      callback({lat: null, lng: null})
    }
  })
};

module.exports = convert;
