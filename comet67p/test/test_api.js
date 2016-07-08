
var should  = require('chai').should();
var request = require("request");

var server  = require('../src/server.js');
var app = require('express')();

describe("Comet67P API", function() {

  before(function(done){
    app.use('/', server)
    app.listen(3000, function() {
      done();
    });
  });

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
        data.should.contain.all.keys('id', 'trace');
        data.trace.should.be.an('array');
        //TODO: Create some dummy entries
        //data[0].trace[0].should.have.all.keys('time', 'lat', 'lng');

        done();
      });
    });

  });

});
