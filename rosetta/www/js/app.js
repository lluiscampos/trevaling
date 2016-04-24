
var PhilaeTrip = Backbone.Model.extend({

  url: 'http://localhost:13337/trips/1',

  defaults: {
    title: "loading...",
  }

});


var PhilaeTripView = Backbone.View.extend({

  el: "#magic",

  template: _.template("<h2><%= title %><h2>"),

  events: {

  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    console.log("Rendering magic...");
    this.$el.html(this.template(this.model.toJSON()));
  }

});


$(document).ready(function() {

  var p = new PhilaeTrip();
  var v = new PhilaeTripView({model: p});
  p.fetch();

});
