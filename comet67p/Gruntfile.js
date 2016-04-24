module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['server.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
