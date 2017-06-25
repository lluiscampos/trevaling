
var logger = require('./logger').cell2coords;

var request = require('request');

var apikey = process.env.GOOGLE_GEOLOCATION_KEY || 'test'
var url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + apikey;

var convert_single = function(params, callback) {

  if ( (params.cid === undefined) || (params.lac === undefined) ) {
    callback(new Error ("Invalid parameters, object must have keys {cid, lac}"));
    return;
  }

  var post_params = {
    "cellTowers": [{
      "locationAreaCode": params.lac,
      "cellId": params.cid,
    }]
  };

  _post_request(post_params, callback);
};

var convert_list = function(params, callback) {

  if (Array.isArray(params) === false) {
    callback(new Error ("Invalid parameters, object must be an array"));
    /* TODO: check for array contents also */
    return;
  }

  var cell_towers = [];

  for (let antenna of params) {
    cell_towers.push({
      "mobileCountryCode": antenna.mcc,
      "mobileNetworkCode": antenna.mnc,
      "locationAreaCode":  antenna.lac,
      "cellId":            antenna.ci,
      "signalStrength":    -antenna.rxlev
    });
  }

  var post_params = {
    "radioType" : "gsm",
    "considerIp": false,
    "cellTowers": cell_towers
  };

  _post_request(post_params, callback);
};

var _post_request = function(post_params, callback)
{
  logger.debug("POST", post_params);

  request.post(url, post_params, function (error, response, body) {
    if (error) {
      callback(new Error('request returned error ' + error))
    }
    else if (response.statusCode != 200) {
      callback(new Error('API call returned status code ' + response.statusCode))
    }
    else {
      var obj = JSON.parse(body);
      if (obj.hasOwnProperty('location')) {
        logger.debug('got location from API', body)
        callback(null, {'lat': obj.location.lat, 'lng': obj.location.lng, 'acc': obj.accuracy})
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

module.exports = {
  'single': convert_single,
  'list':   convert_list
}
