
var should  = require('chai').should();
var sinon   = require('sinon');
var fs      = require('fs');

var test_db_file = '/tmp/test_db.json'
process.env.DATABASE_FILEPATH = test_db_file

var dataman = require('../src/dataman.js');

describe("Dataman module", function() {

  describe("Initializes", function() {


    before(function(done){
      fs.stat(test_db_file, function(err, stats) {
        if (stats && stats.isFile()) {
          fs.unlinkSync(test_db_file);
        }
        done();
      })
    });

    it("creates db.json file", function(done) {

      fs.stat(test_db_file, function(err, stat) {
        should.exist(err);
        should.not.exist(stat);
      });

      dataman.init();
      fs.stat(test_db_file, function(err, stat) {
        should.not.exist(err);
        stat.isFile().should.equal(true)
        done();
      });

    });

    it("create first-trip table", function(done) {

      dataman.init();
      fs.readFile(test_db_file, function(err, d) {
        should.not.exist(err);
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

  describe("Manipulates data", function() {

    before(function(){
      dataman.init();
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

    describe("Not initialized database", function() {

      beforeEach(function() {
        delete require.cache[require.resolve('../src/dataman.js')];
        dataman = require('../src/dataman.js');
      });

      it("on viewer", function(done) {

        dataman.viewer({}, function(err, data) {
          should.exist(err);
          err.should.be.an('Error');
          err.message.should.equal('Database not initialized');
          done();
        });

      });

      it("on insert", function(done) {

        dataman.philae({}, function(err, data) {
          should.exist(err);
          err.should.be.an('Error');
          err.message.should.equal('Database not initialized');
          done();
        });

      });
    });

    describe("Transport system errors", function() {

      before(function() {
        sinon
          .stub(fs, 'writeFile')
          .yields(new Error('Some fancy system error'));
        sinon
          .stub(fs, 'readFileSync')
          .throws(new Error('Other fancy system error'));
        sinon
          .stub(fs, 'writeFileSync')
          .throws(new Error('Yet another fancy system error'));
      });

      after(function() {
        fs.writeFile.restore();
        fs.readFileSync.restore();
        fs.writeFileSync.restore();
      })

      it("on init", function() {
        (function () { dataman.init() }).should.throw(Error);
      });

      it("on insert", function(done) {

        dataman.philae({
            'time': '2016-05-16T12:34:23.887Z',
            'lat' : '12.3456789',
            'lng' : '98.7654321'}, function(err, data) {
          should.exist(err);
          err.should.be.an('Error');
          done();
        });

      });

    });

    describe("Throws sanity errors on insert", function() {

      it("missing time", function(done) {
        dataman.philae({
            'lat' : '12.3456789',
            'lng' : '98.7654321'}, function(err, data) {
          should.exist(err);
          err.should.be.an('Error');
          done();
        });
      });

      it("missing lat", function(done) {
        dataman.philae({
            'time': '2016-05-16T12:34:23.887Z',
            'lng' : '98.7654321'}, function(err, data) {
          should.exist(err);
          err.should.be.an('Error');
          done();
        });
      });

      it("missing lng", function(done) {
        dataman.philae({
            'time': '2016-05-16T12:34:23.887Z',
            'lat' : '12.3456789'}, function(err, data) {
          should.exist(err);
          err.should.be.an('Error');
          done();
        });
      });

    });

  });
});
