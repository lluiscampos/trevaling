
require('dotenv').config();

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
                console.log("Calling dataman:", event)
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
