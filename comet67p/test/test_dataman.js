
var should  = require('chai').should();
var fs      = require('fs');

var dataman = require('../src/dataman.js');

describe("Dataman module", function() {

  describe("Initializes", function() {


    before(function(done){
      fs.stat('db.json', function(err, stats) {
        if (stats && stats.isFile()) {
          fs.unlinkSync('db.json');
        }
        done();
      })
    });

    it("creates db.json file", function(done) {

      fs.stat('db.json', function(err, stat) {
        should.exist(err);
        should.not.exist(stat);
      });

      dataman.init(function(err) {
        should.not.exist(err);
        fs.stat('db.json', function(err, stat) {
          should.not.exist(err);
          stat.isFile().should.equal(true)
          done();
        });
      });

    });

    it("create first-trip table", function(done) {

      dataman.init(function(err) {
        should.not.exist(err);
        fs.readFile('db.json', function(err, d) {
          var data = JSON.parse(d);
          data.should.be.an('array');
          data[0].should.exist;
          data[0].should.contain.all.keys('id', 'trace');
          data[0].id.should.equal('first-trip');
          data[0].trace.should.be.an('array');
          data[0].trace.should.be.empty;
          done();
        });

      });

    });

  });

  describe("Manipulates data", function() {

    before(function(done){
      dataman.init(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it("returns data", function(done) {

      dataman.viewer({}, function(err, data) {
        should.not.exist(err);

        data.should.be.an('array');
        data[0].should.exist;
        data[0].should.contain.all.keys('id', 'trace');
        data[0].id.should.equal('first-trip');
        data[0].trace.should.be.an('array');
        data[0].trace.should.be.empty;
        done();
      });

    });

    it("inserts data", function(done) {

      dataman.philae({
          'time': '2016-05-16T12:34:23.887Z',
          'lat' : '12.3456789',
          'lng' : '98.7654321'}, function(err) {
        should.not.exist(err);
        done();
      });

    });

    it("updates data", function(done) {

      dataman.philae({
          'time': '2016-05-16T12:34:23.887Z',
          'lat' : '12.3456789',
          'lng' : '98.7654321'}, function(err) {
        should.not.exist(err);

        dataman.viewer({}, function(err, data) {
          should.not.exist(err);

          data.should.be.an('array');
          data[0].should.exist;
          data[0].should.contain.all.keys('id', 'trace');
          data[0].id.should.equal('first-trip');
          data[0].trace.should.be.an('array');
          data[0].trace.should.have.length.of.at.least(1);
          data[0].trace[0].should.have.all.keys('time', 'lat', 'lng');
          data[0].trace[0].time.should.equal('2016-05-16T12:34:23.887Z');
          data[0].trace[0].lat.should.equal('12.3456789');
          data[0].trace[0].lng.should.equal('98.7654321');
          done();
        });

      });

    });

  });

  describe("Handles errors nicely", function() {


    beforeEach(function() {
      delete require.cache[require.resolve('../src/dataman.js')];
      dataman = require('../src/dataman.js');
    });

    it("not initialized db on viewer", function(done) {

      dataman.viewer({}, function(err, data) {
        should.exist(err);
        err.should.be.an('Error');
        err.message.should.equal('Database not initialized');
        done();
      });

    });

    it("not initialized db on insert", function(done) {

      dataman.philae({}, function(err, data) {
        should.exist(err);
        err.should.be.an('Error');
        err.message.should.equal('Database not initialized');
        done();
      });

    });

  });
});
