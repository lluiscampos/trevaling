
define(
  [
    'chai',
    'backbone',
    'models/TripModel',
    'views/TripView'
  ],
  function(
    chai,
    Backbone,
    TripModel,
    TripView
  ){

    var should = chai.should();

    describe("PhilaeTrip Model", function() {

      it("should do stuff", function() {
        var m = new TripModel();
        m.id.should.equal('loading...');
      });

    });

  }
);
