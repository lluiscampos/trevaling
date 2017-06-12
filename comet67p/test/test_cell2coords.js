
var should  = require('chai').should();
var nock    = require('nock')

var cell2coords  = require('../src/cell2coords.js');

describe("Cell2Coords module", function() {

  describe("Translate cellular info into coordinates", function() {

    var api_resp = {"location": {"lat": 59.905, "lng": 10.7487}, "accuracy": 1000.0};

    before(function(){
      nock('https://location.services.mozilla.com')
        .post(/v1\/geolocate\?key=\w+$/)
        .reply(200, JSON.stringify(api_resp));
    });

    it("converts {cid, lac} into {lat,lng}", function(done) {

      cell2coords({cid: 13542127, lac: 20601}, function(error, coords) {
        should.not.exist(error);
        coords.lat.should.equal(59.905);
        coords.lng.should.equal(10.7487);

        done();
      });

    });

  });

  describe("Handles unknown identifiers", function() {

    var api_resp = {"error":{"errors":[{"domain":"geolocation","reason":"notFound",
        "message":"Not found",}],"code": 404,"message":"Not found"}}

    before(function(){
      nock('https://location.services.mozilla.com')
        .post(/v1\/geolocate\?key=\w+$/)
        .reply(200, JSON.stringify(api_resp));
    });

    it("throws error for uknown identifiers", function(done) {

      cell2coords({cid: 1234, lac: 5678}, function(error, coords) {
        should.exist(error);
        error.should.be.an('Error');
        error.message.should.equal(JSON.stringify(api_resp.error));

        done();
      });

    });

  });

  describe("Handle HTTP errors", function() {

    before(function(){
      nock('https://location.services.mozilla.com')
        .post(/v1\/geolocate\?key=\w+$/)
        .reply(404, 'This page could not be found');
    });

    it("propagates error from HTTP 404", function(done) {

      cell2coords({cid: 1234, lac: 5678}, function(error, coords) {
        should.exist(error);
        error.should.be.an('Error');
        error.message.should.equal('API call returned status code 404');

        done();
      });

    });

  });

});
