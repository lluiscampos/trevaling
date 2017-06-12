
var request = require('request');
require('dotenv').config();

var convert = function(params, callback) {

  if ( (params.cid === undefined) || (params.lac === undefined) ) {
    callback(new Error ("Invalid parameters, object must have keys {cid, lac}"));
    return;
  }

  var apikey = process.env.MLS_API_KEY || 'test'

  var url = 'https://location.services.mozilla.com/v1/geolocate?key=' + apikey;

  var post_params = {
    "cellTowers": [{
      "locationAreaCode": params.lac,
      "cellId": params.cid,
    }]
  };

  request.post(url, params, function (error, response, body) {
    if (error) {
      callback(new Error('request returned error ' + error))
    }
    else if (response.statusCode != 200) {
      callback(new Error('API call returned status code ' + response.statusCode))
    }
    else {
      var obj = JSON.parse(body);
      if (obj.hasOwnProperty('location')) {
        console.log(body)
        callback(null, {lat: obj.location.lat, lng: obj.location.lng})
      }
      else if (obj.hasOwnProperty('error')) {
        callback(new Error(JSON.stringify(obj.error)))
      }
      else {
        callback(new Error('Unknown response ' + JSON.stringify(obj)))
      }
    }
  })
};

module.exports = convert;
