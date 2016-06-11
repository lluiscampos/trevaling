
require('dotenv').config();
var cell2coords = require('./cell2coords');
var dataman = require('./dataman');

var user = process.env.PARTICLE_LOGIN_USER     || 'PARTICLE_LOGIN_USER';
var pass = process.env.PARTICLE_LOGIN_PASSWORD || 'PARTICLE_LOGIN_PASSWORD';

var Particle = require('particle-api-js');
var particle = new Particle();

var listen = function(params, callback)
{
  particle.login({username: user, password: pass}).then(
    function(data){
      var token = data.body.access_token;

      particle.listDevices({ auth: token }).then(
        function(devices){
          var deviceId = devices.body[0].id;

          particle.getEventStream({deviceId: deviceId, auth: token }).then(function(stream) {
            console.log("Listening to events...")
            stream.on('event', function(event) {
              if (event.name === 'current-position')
              {
                var data = JSON.parse(event.data);

                cell2coords({cid: data.ci, lac: data.lac}, function(err, coords) {
                  if (err) {
                    console.log("[cell2coords] Logging error:", err)
                  }
                  else {
                    dataman.philae({
                      'time': event.published_at,
                      'lat' : coords.lat,
                      'lng' : coords.lng
                    }, function(err) {
                      if (err) {
                        console.log("[dataman] Logging error:", err)
                      }
                    });
                  }
                });
              }
              console.log("Adding to logger:", event)
            });
          });

        },
        function(err) {
          callback(new Error ('List devices call failed: ' + err));
        }
      );

    },
    function(err) {
      callback(new Error ('API call completed on promise fail: ' + err));
    }
  );
}

module.exports = listen;
