
var istanbul = require('browserify-istanbul');


module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      src: ['rosetta/src/**/*.js']
    },

    browserify: {
      coverage: {
        files: {
          'rosetta/test/instrumented-app/models/BaseModel.js': 'rosetta/src/app/models/BaseModel.js',
          'rosetta/test/instrumented-app/models/TripModel.js': 'rosetta/src/app/models/TripModel.js',
          'rosetta/test/instrumented-app/views/TripView.js'  : 'rosetta/src/app/views/TripView.js'
        },
        options: {
          transform: [istanbul]
        }
      }
    },

    mocha: {
      options: {
        log: true,
        reporter: 'Spec',
        coverage: {
          lcovReport: 'rosetta/coverage'
        }
      },
      test: {
          src: ['rosetta/test/index.html']
      }
    },

    json_server: {
      options: {
        port: 13337,
        hostname: 'localhost',
        db: 'rosetta/api.json'
      },
      dev : {}
    },

    copy: {
      app: {
        files: [
          {src: 'rosetta/src/index.html', dest: 'rosetta/www/index.html'},
          {expand: true, cwd: 'rosetta/src', src: ['*.css'],   dest: 'rosetta/www/css/', filter: 'isFile'},
          {expand: true, cwd: 'rosetta/src', src: ['**/*.js'], dest: 'rosetta/www/js/',  filter: 'isFile'}
        ]
      }
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'rosetta/www'
        },
        files: {
          'css/bootstrap.css'         : 'bootstrap/dist/css/bootstrap.css',
          'css/normalize.css'         : 'normalize-css/normalize.css',
          'css/leaflet.css'           : 'leaflet/dist/leaflet.css',
          'css/images'                : 'leaflet/dist/images/layers*',
          'js/libs/require.js'        : 'requirejs/require.js',
          'js/libs/bootstrap.js'      : 'bootstrap/dist/js/bootstrap.js',
          'js/libs/jquery.js'         : 'jquery/dist/jquery.js',
          'js/libs/underscore.js'     : 'underscore/underscore.js',
          'js/libs/backbone.js'       : 'backbone/backbone.js',
          'js/libs/backbone-poller.js': 'backbone-poller/backbone.poller.js',
          'js/libs/handlebars.js'     : 'handlebars/handlebars.js',
          'js/libs/leaflet.js'        : 'leaflet/dist/leaflet-src.js',
          'js/libs/images'            : 'leaflet/dist/images/marker*'
        }
      }
    },

    clean: {
      build: ['rosetta/www'],
      tests: ['rosetta/coverage', 'rosetta/test/instrumented-app']
    },

    watch: {
      files: ['rosetta/src/**/*'],
      tasks: ['copy']
    },

    concurrent: {
      dev: {
        tasks: ['watch', 'json_server'],
        options: { logConcurrentOutput: true }
      }
    }

  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-json-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-phantom-istanbul');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['copy:app', 'bowercopy']);
  grunt.registerTask('test', ['browserify:coverage', 'mocha']);
  grunt.registerTask('run', ['build', 'concurrent:dev']);
  grunt.registerTask('default', ['clean', 'lint', 'build', 'test']);

};
