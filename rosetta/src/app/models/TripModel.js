
define(
  [
    'underscore',
    'backbone'
  ], function(
    _,
    Backbone
  ){

    var TripModel = Backbone.Model.extend({

      url: 'http://localhost:13337/trips/first-trip',

      defaults: {
        id: "loading..."
      },

      getCurrentPosition: function() {
        return _.last(this.get('trace'));
      }

    });

    return TripModel;

  }
);
