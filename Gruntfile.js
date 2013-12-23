module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'bower_components/jquery/jquery.min.js', // jQuery
					'js/*.js'  // All local JS files
				],
				dest: 'js/concat.min.js',
			}
		}

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['concat']);

};
