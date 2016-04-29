module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      src: ["www/js/app.js"]
    },

    mocha_phantomjs: {
      options: {
        reporter: 'spec'
      },
      all: ['test/index.html']
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

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-json-server');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

};
