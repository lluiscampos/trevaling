
var should  = require('chai').should();
var request = require("request");

var cell2coords  = require('../src/cell2coords.js');

describe("Cell2Coords module", function() {

  describe("Translate cellular info into coordinates", function() {

    it("converts {cid, lac} into {lat,lng}", function(done) {
      this.timeout(2000);

      //TODO: Find a way to mock OpenSignal API!
      cell2coords({cid: 13564400, lac: 20601}, function(error, ret) {
        should.not.exist(error);
        ret.lat.should.equal('59.90981531125');
        ret.lng.should.equal('10.77598607375');

        done();
      });

    });

  });

});
