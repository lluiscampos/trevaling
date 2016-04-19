module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // This line makes your node configurations available for use
    pkg: grunt.file.readJSON('package.json'),
    // This is where we configure JSHint
    jshint: {
      // You get to make the name
      // The paths tell JSHint which files to validate
      files: ['www/js/*.js']
    },

    json_server: {
        options: {
            port: 13337,
            hostname: 'localhost',
            db: 'api.json'
        },
        my_target : {}
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'www'
        },
        files: {
          'css/milligram.css'     : 'milligram/dist/milligram.css',
          'css/normalize.css'     : 'normalize.css/normalize.css',
          'js/libs/jquery.js'     : 'jquery/dist/jquery.js',
          'js/libs/underscore.js' : 'underscore/underscore.js',
          'js/libs/backbone.js'   : 'backbone/backbone.js'
        }
      }
    }

  });

  // Each plugin must be loaded following this pattern
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-json-server');

};
