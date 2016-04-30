module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      src: ["src/*.js"]
    },

  });

  grunt.loadNpmTasks("gruntify-eslint");

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('default', ['lint']);

};
