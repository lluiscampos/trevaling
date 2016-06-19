
/* global Backbone, _, $ */

var PhilaeTrip = Backbone.Model.extend({

  url: 'http://localhost:13337/trips/first-trip',

  defaults: {
    title: "loading..."
  }

});


var PhilaeTripView = Backbone.View.extend({

  el: "#magic",

  template: _.template("<h2><%= id %><h2>"),

  events: {

  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }

});


$(document).ready(function() {

  var p = new PhilaeTrip();
  new PhilaeTripView({model: p});
  p.fetch();

});

// Keep var globals after instrumention
window.PhilaeTrip = PhilaeTrip;
window.PhilaeTripView = PhilaeTripView;
