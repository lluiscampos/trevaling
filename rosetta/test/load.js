
require.config({
  paths: {
    'models'     : 'instrumented-app/models',
    'views'      : 'instrumented-app/views',
    'bootstrap'  : '../bower_components/bootstrap/dist/js/bootstrap',
    'jquery'     : '../bower_components/jquery/dist/jquery',
    'underscore' : '../bower_components/underscore/underscore',
    'backbone'   : '../bower_components/backbone/backbone',
    'handlebars' : '../bower_components/handlebars/handlebars',
    'chai'       : '../node_modules/chai/chai'
  },
  shim: {
    "bootstrap": ["jquery"]
  }
});

require(
  [
    "jquery",
    "backbone",
    "test_something",
    "chai",
    "handlebars"
  ],
  function(
    $,
    Backbone
  ){
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  }
);
