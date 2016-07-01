
define(
  [
    'jquery',
    'backbone',
    'backbone-poller',
    'app/models/TripModel',
    'app/views/TripView'
  ],
  function(
    $,
    Backbone,
    BackbonePoller,
    TripModel,
    TripView
  ){
    $(document).ready(function() {
      var p = new TripModel();
      new TripView({model: p});

      var poller = BackbonePoller.get(p, {delay: [1000, 60000, 2]});
      poller.start();
    });

  }
);
