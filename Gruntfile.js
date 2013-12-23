/*
 * Based on http://24ways.org/2013/grunt-is-not-weird-and-hard/
 */

module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Copy:
		copy: {
			main: {
				files: [
					{expand: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'fonts/', filter: 'isFile'},
				]
			}
		},
		// Combine:
		concat: {
			dist: {
				src: [
					'bower_components/jquery/jquery.min.js',
					'bower_components/owlcarousel/owl-carousel/owl.carousel.min.js',
					'js/main.js'  // All local JS files
				],
				dest: 'js/build/main.concat.js',
			}
		},
		// Minimize JS
		uglify: {
			build: {
				src: 'js/build/main.concat.js',
				dest: 'js/main.min.js'
			}
		},
		// Optimize images
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},
		// Compile CSS
		less: {
			development: {
				options: {
					paths: ['css'],
					sourceMap : true
				},
				files: {
					'css/main.css': 'css/main.less'
				}
			},
			production: {
				options: {
					paths: ['css'],
					cleancss : true
				},
				files: {
					'css/main.min.css': 'css/main.less'
				}
			}
		},
		// Watch
		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['css/*.less', 'css/assets/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
				}
			}
		},
	});

	// PLUGINS
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['copy', 'concat', 'uglify', 'imagemin', 'less', 'watch']);

};
