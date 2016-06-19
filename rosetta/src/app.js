
/* global Backbone, Handlebars, $ */

var PhilaeTrip = Backbone.Model.extend({

  url: 'http://localhost:13337/trips/first-trip',

  defaults: {
    id: "loading..."
  }

});


var PhilaeTripView = Backbone.View.extend({

  el: "#magic",

  template: Handlebars.compile("<h2>{{id}}</h2><ul>{{#each trace}}<li>{{published_at}}@{{lat}},{{lng}}</li>{{/each}}</ul>"),

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
