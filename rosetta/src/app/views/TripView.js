
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

      map: null,

      template: Handlebars.compile('<div class="starter-template"><h1>trevaling...{{id}}</h1></div>'),

      events: {

      },

      initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.map = Leaflet.map('mapid').setView([0, 0], 12);
        Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      },

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        _.each(this.model.get('trace'), function(position, index){
          var title = '[' + index + '] ' + position.published_at
          Leaflet.marker(
            position,
            {title: title}
          ).bindPopup(position.published_at).addTo(this.map);
        }, this);

        Leaflet.polyline(this.model.get('trace')).addTo(this.map);

        this.map.panTo(this.model.get('current_position'));
      }

    });

    return TripView;

  }
);
