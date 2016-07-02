
define(
  [
    'backbone'
  ], function(
    Backbone
  ){

    var BaseModel = Backbone.Model.extend({

      /* Custom getter to allow accessing virtual attributes as regular ones */
      get: function (attr) {
        if (typeof this[attr] === 'function') {
          return this[attr]();
        }
        return Backbone.Model.prototype.get.call(this, attr);
      }

    });

    return BaseModel;

  }
);
