
var should  = require('chai').should();
var nock    = require('nock')

var cell2coords  = require('../src/cell2coords.js');

describe("Cell2Coords module", function() {

  describe("Translate cellular info into coordinates", function() {

    var api_resp = {"apiVersion":"2","CID":"13564400","LAC":"20601","phone_type":"GSM",
        "SID":null,"network_id":null,"perMinuteCurrent":0,"perMinuteLimit":10,
        "perMonthCurrent":34,"perMonthLimit":2000,"tower1":{"phone_type":"GSM","psc":0,
        "cid":13564400,"lac":20601,"est_lat":"59.90981531125","est_lng":"10.77598607375",
        "est_acc":"236.7925","est_stddev":"0.25","2G":0,"3G":1,"4G":0,"network_id_main":2420,
        "network_ids_json_out":"NULL"}};

    before(function(){
      nock('http://api.opensignal.com')
        .get(/v2\/towerinfo\.json\?cid=\d+&lac=\d+&apikey=\w+$/)
        .reply(200, JSON.stringify(api_resp));
    });

    it("converts {cid, lac} into {lat,lng}", function(done) {

      cell2coords({cid: 13564400, lac: 20601}, function(error, coords) {
        should.not.exist(error);
        coords.lat.should.equal('59.90981531125');
        coords.lng.should.equal('10.77598607375');

        done();
      });

    });

  });

});
