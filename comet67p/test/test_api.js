
var should  = require('chai').should();
var request = require("request");

var server  = require('../src/server.js');
server();

describe("Comet67P API", function() {

  describe("GET api/viewer", function() {

    var url = "http://localhost:3000/viewer";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        response.statusCode.should.equal(200);

        done();
      });
    });

    it("returns a json string", function(done) {
      request(url, function(error, response, body) {
        response.headers['content-type'].should.contain('application/json');
        body.should.be.a('string');

        done();
      });
    });

    it("trip data is parsable", function(done) {
      request(url, function(error, response, body) {
        var data = JSON.parse(body);
        data.should.be.an('array');
        data[0].should.exist;
        data[0].should.contain.all.keys('id', 'trace');
        data[0].trace.should.be.an('array');
        //TODO: Create some dummy entries
        //data[0].trace[0].should.have.all.keys('time', 'lat', 'lng');

        done();
      });
    });

  });

});
