
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
