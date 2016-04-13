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

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'www'
        },
        files: {
          'css/milligram.min.css' : 'milligram/dist/milligram.min.css',
          'css/normalize.css' : 'normalize.css/normalize.css'
        }
      }
    }

  });

  // Each plugin must be loaded following this pattern
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bowercopy');

};
