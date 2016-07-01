
var istanbul = require('browserify-istanbul');


module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      src: ["src/**/*.js"]
    },

    browserify: {
      coverage: {
        files: {
          'test/instrumented-app/models/TripModel.js': 'src/app/models/TripModel.js',
          'test/instrumented-app/views/TripView.js'  : 'src/app/views/TripView.js'
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
          lcovReport: 'coverage'
        }
      },
      test: {
          src: ['test/index.html']
      }
    },

    json_server: {
      options: {
        port: 13337,
        hostname: 'localhost',
        db: 'api.json'
      },
      dev : {}
    },

    copy: {
      app: {
        files: [
          {src: 'src/index.html', dest: 'www/index.html'},
          {expand: true, cwd: 'src', src: ['*.css'],   dest: 'www/css/', filter: 'isFile'},
          {expand: true, cwd: 'src', src: ['**/*.js'], dest: 'www/js/',  filter: 'isFile'}
        ]
      }
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
          'css/bootstrap.css'         : 'bootstrap/dist/css/bootstrap.css',
          'css/normalize.css'         : 'normalize-css/normalize.css',
          'js/libs/require.js'        : 'requirejs/require.js',
          'js/libs/bootstrap.js'      : 'bootstrap/dist/js/bootstrap.js',
          'js/libs/jquery.js'         : 'jquery/dist/jquery.js',
          'js/libs/underscore.js'     : 'underscore/underscore.js',
          'js/libs/backbone.js'       : 'backbone/backbone.js',
          'js/libs/backbone-poller.js': 'backbone-poller/backbone.poller.js',
          'js/libs/handlebars.js'     : 'handlebars/handlebars.js'
        }
      }
    },

    clean: {
      build: ['www'],
      tests: ['coverage', 'test/instrumented-app']
    },

    watch: {
      files: ['src/**/*'],
      tasks: ['copy']
    },

    concurrent: {
      dev: {
        tasks: ['watch', 'json_server'],
        options: { logConcurrentOutput: true }
      }
    }

  });

  grunt.loadNpmTasks("gruntify-eslint");
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
