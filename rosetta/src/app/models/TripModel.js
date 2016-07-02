
define(
  [
    'underscore',
    'backbone',
    'models/BaseModel'
  ], function(
    _,
    Backbone,
    BaseModel
  ){

    var TripModel = BaseModel.extend({

      url: 'http://localhost:13337/trips/first-trip',

      defaults: {
        id: "loading..."
      },

      current_position: function() {
        return _.last(this.get('trace'));
      }

    });

    return TripModel;

  }
);
