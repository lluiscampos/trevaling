module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('../package.json'),

    eslint: {
      src: ["src/*.js"]
    },

    clean: {
      tests: ['coverage']
    }

  });

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('default', ['clean:all', 'lint']);

};
