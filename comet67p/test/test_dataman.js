
var should  = require('chai').should();
var fs      = require('fs');

var dataman = require('../src/dataman.js');

describe("Dataman module", function() {

  describe("Initializes", function() {

    var remove_db_file = function(done) {
      fs.stat('db.json', function(err, stats) {
        if (stats && stats.isFile()) {
          fs.unlinkSync('db.json');
        }
        done();
      })
    }

    before(function(done){
      remove_db_file(done);
    });

    after(function(done){
      remove_db_file(done);
    });

    it("creates db.json file", function(done) {

      fs.stat('db.json', function(err, stat) {
        should.exist(err);
        should.not.exist(stat);
      });

      dataman.init(function(err) {
        fs.stat('db.json', function(err, stat) {
          should.not.exist(err);
          stat.isFile().should.equal(true)
          done();
        });
      });

    });

  });

});
