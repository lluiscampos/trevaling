
define(['backbone'], function(Backbone) {

  var TripModel = Backbone.Model.extend({

    url: 'http://localhost:13337/trips/first-trip',

    defaults: {
      id: "loading..."
    }

  });

  return TripModel;

});
