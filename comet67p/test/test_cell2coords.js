
var should  = require('chai').should();
var nock    = require('nock')

var cell2coords  = require('../src/cell2coords.js');

describe("Cell2Coords module", function() {

  describe("Translate cellular info into coordinates", function() {

    var api_resp = {"apiVersion":"2","CID":"1234","LAC":"5678","phone_type":"GSM",
        "SID":null,"network_id":null,"perMinuteCurrent":0,"perMinuteLimit":10,
        "perMonthCurrent":34,"perMonthLimit":2000,"tower1":{"phone_type":"GSM","psc":0,
        "cid":1234,"lac":5678,"est_lat":"12.3456789","est_lng":"98.7654321",
        "est_acc":"236.7925","est_stddev":"0.25","2G":0,"3G":1,"4G":0,"network_id_main":2420,
        "network_ids_json_out":"NULL"}};

    before(function(){
      nock('http://api.opensignal.com')
        .get(/v2\/towerinfo\.json\?cid=\d+&lac=\d+&apikey=\w+$/)
        .reply(200, JSON.stringify(api_resp));
    });

    it("converts {cid, lac} into {lat,lng}", function(done) {

      cell2coords({cid: 1234, lac: 5678}, function(error, coords) {
        should.not.exist(error);
        coords.lat.should.equal('12.3456789');
        coords.lng.should.equal('98.7654321');

        done();
      });

    });

  });

  describe("Handles unknown identifiers", function() {

    var api_resp = {"apiVersion":"2","CID":"1234","LAC":"5678","phone_type":"GSM",
        "SID":null,"network_id":null,"perMinuteCurrent":0,"perMinuteLimit":10,
        "perMonthCurrent":38,"perMonthLimit":2000,"towers":"No towers with these identifiers"};

    before(function(){
      nock('http://api.opensignal.com')
        .get(/v2\/towerinfo\.json\?cid=\d+&lac=\d+&apikey=\w+$/)
        .reply(200, JSON.stringify(api_resp));
    });

    it("throws error for uknown identifiers", function(done) {

      cell2coords({cid: 1234, lac: 5678}, function(error, coords) {
        should.exist(error);
        error.should.be.an('Error');
        error.message.should.equal('No towers with these identifiers');

        done();
      });

    });

  });

  describe("Handle HTTP errors", function() {

    before(function(){
      nock('http://api.opensignal.com')
      .get(/./g)
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
