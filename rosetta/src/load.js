
require.config({
  paths: {
    'bootstrap'      : 'libs/bootstrap',
    'jquery'         : 'libs/jquery',
    'underscore'     : 'libs/underscore',
    'backbone'       : 'libs/backbone',
    'backbone-poller': 'libs/backbone-poller',
    'handlebars'     : 'libs/handlebars'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(['app/main', 'bootstrap'], function(){

  // Do nothing

});
