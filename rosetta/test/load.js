
require.config({
  paths: {
    'models'     : 'instrumented-app/models',
    'views'      : 'instrumented-app/views',
    'bootstrap'  : '../node_modules/bootstrap/dist/js/bootstrap',
    'jquery'     : '../node_modules/jquery/dist/jquery',
    'underscore' : '../node_modules/underscore/underscore',
    'backbone'   : '../node_modules/backbone/backbone',
    'handlebars' : '../node_modules/handlebars/dist/handlebars',
    'leaflet'    : '../node_modules/leaflet/dist/leaflet-src',
    'chai'       : '../node_modules/chai/chai'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(
  [
    'test_something'
  ],
  function(

  ){
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  }
);
