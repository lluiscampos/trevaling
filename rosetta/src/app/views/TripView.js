
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'leaflet'
  ], function(
    $,
    _,
    Backbone,
    Handlebars,
    Leaflet
  ){

    var TripView = Backbone.View.extend({

      el: "#magic",

      map; null,

      template: Handlebars.compile("<h2>{{id}}</h2><ul>{{#each trace}}<li>{{published_at}}@{{lat}},{{lng}}</li>{{/each}}</ul>"),

      events: {

      },

      initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.map = Leaflet.map('mapid').setView([0, 0], 6);
        Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      },

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        _.each(this.model.attributes.trace, function(trace){
          Leaflet.marker(
            [trace.lat, trace.lng],
            {title: trace.published_at}
          ).bindPopup(trace.published_at).addTo(this.map);
        }, this);
        this.map.panTo(_.last(this.model.attributes.trace));
      }

    });

    return TripView;

  }
);
