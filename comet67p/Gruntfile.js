module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      src: ["server.js"]
    },

  });

  grunt.loadNpmTasks("gruntify-eslint");

};
