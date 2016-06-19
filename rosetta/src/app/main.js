
define(['jquery', 'app/models/TripModel', 'app/views/TripView'], function($, TripModel, TripView) {

  $(document).ready(function() {

    var p = new TripModel();
    new TripView({model: p});
    p.fetch();

    if (navigator.userAgent.indexOf('PhantomJS') < 0) {
      setInterval(function() { p.fetch() }, 3000 );
    }

  });

});
