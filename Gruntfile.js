module.exports = function(grunt) {
    var _ = require('lodash');
    var paths = {
        tests: 'tests/**/scripts',
        examples: 'examples/**/scripts',
        src: 'assets/scripts/src'
    };

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: _.values(paths),
            tests: [paths.tests],
            examples: [paths.examples],
            src: [paths.src]
        }
    });
    // Load the jshint plugin.
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
