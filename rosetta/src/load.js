
require.config({
  paths: {
    'models'         : 'app/models',
    'views'          : 'app/views',
    'bootstrap'      : 'libs/bootstrap',
    'jquery'         : 'libs/jquery',
    'underscore'     : 'libs/underscore',
    'backbone'       : 'libs/backbone',
    'backbone-poller': 'libs/backbone-poller',
    'handlebars'     : 'libs/handlebars',
    'leaflet'        : 'libs/leaflet'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(['app/main', 'bootstrap', 'leaflet'], function(){

  /* global L */
  // Remove global L created by leaflet
  L.noConflict();

});
