
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

      //TODO: fix so that it still works on dev mode (serve static html from grunt?)
      //url: 'http://localhost:8080/viewer',
      url: 'viewer',

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
