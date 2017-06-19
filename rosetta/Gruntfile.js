
var istanbul = require('browserify-istanbul');


module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      src: ['src/**/*.js']
    },

    browserify: {
      coverage: {
        files: {
          'test/instrumented-app/models/BaseModel.js': 'src/app/models/BaseModel.js',
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
        port: 8080,
        hostname: 'localhost',
        db: 'api.json'
      },
      dev : {}
    },

    copy: {
      app: {
        files: [
          {src: 'src/index.html', dest: 'www/index.html'},
          {src: 'node_modules/bootstrap/dist/css/bootstrap.css', dest: 'www/css/bootstrap.css'},
          {src: 'node_modules/normalize-css/normalize.css',      dest: 'www/css/normalize.css'},
          {src: 'node_modules/leaflet/dist/leaflet.css', dest: 'www/css/leaflet.css'},
          {src: 'node_modules/leaflet/dist/images/layers*', dest: 'www/css/images'},
          {src: 'node_modules/requirejs/require.js', dest: 'www/js/libs/require.js'},
          {src: 'node_modules/bootstrap/dist/js/bootstrap.js', dest: 'www/js/libs/bootstrap.js'},
          {src: 'node_modules/jquery/dist/jquery.js', dest: 'www/js/libs/jquery.js'},
          {src: 'node_modules/underscore/underscore.js', dest: 'www/js/libs/underscore.js'},
          {src: 'node_modules/backbone/backbone.js', dest: 'www/js/libs/backbone.js'},
          {src: 'node_modules/backbone-poller/backbone.poller.js', dest: 'www/js/libs/backbone-poller.js'},
          {src: 'node_modules/handlebars/dist/handlebars.js', dest: 'www/js/libs/handlebars.js'},
          {src: 'node_modules/leaflet/dist/leaflet-src.js', dest: 'www/js/libs/leaflet.js'},
          {src: 'node_modules/leaflet/dist/images/marker*', dest: 'www/js/libs/images'},
          {expand: true, cwd: 'src', src: ['*.css'],   dest: 'www/css/', filter: 'isFile'},
          {expand: true, cwd: 'src', src: ['**/*.js'], dest: 'www/js/',  filter: 'isFile'}
        ]
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

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-json-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-phantom-istanbul');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['copy:app']);
  grunt.registerTask('test', ['browserify:coverage', 'mocha']);
  grunt.registerTask('run', ['build', 'concurrent:dev']);
  grunt.registerTask('default', ['clean', 'lint', 'build', 'test']);

};
