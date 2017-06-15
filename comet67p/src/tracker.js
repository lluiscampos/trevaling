
var logger = require('./logger').tracker;

require('dotenv').config();
var cell2coords = require('./cell2coords');
var dataman = require('./dataman');

var user  = process.env.PARTICLE_LOGIN_USER     || 'PARTICLE_LOGIN_USER';
var pass  = process.env.PARTICLE_LOGIN_PASSWORD || 'PARTICLE_LOGIN_PASSWORD';
var token = process.env.PARTICLE_CLOUD_TOKEN    || 'PARTICLE_CLOUD_TOKEN';

var Particle = require('particle-api-js');
var particle = new Particle();

var login = function(params, callback)
{
  particle.login({username: user, password: pass}).then(
    function(data){
      token = data.body.access_token;
      callback(null);
    },
    function(err) {
      callback(new Error ('API call completed on promise fail: ' + err));
    }
  );
}

var listen = function(params, callback)
{
  particle.listDevices({ auth: token }).then(
    function(devices){
      var deviceId = devices.body[0].id;

      particle.getEventStream({deviceId: deviceId, auth: token }).then(function(stream) {
        logger.info("Listening to events")
        stream.on('event', function(event) {
          if (event.name === 'current-position')
          {
            var data = JSON.parse(event.data);

            cell2coords({cid: data.ci, lac: data.lac}, function(err, coords) {
              if (err) {
                logger.error("[cell2coords] Logging error:", err)
              }
              else {
                dataman.philae({
                  'time': event.published_at,
                  'lat' : coords.lat,
                  'lng' : coords.lng
                }, function(err) {
                  if (err) {
                    logger.error("[dataman] Logging error:", err)
                  }
                });
              }
            });
          }
          logger.info("Adding to logger:", event)
        });
      });

    },
    function(err) {
      callback(new Error ('List devices call failed: ' + err));
    }
  );
}

module.exports = {
  login:  login,
  listen: listen
};
