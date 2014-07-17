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
					{
						expand: true,
						src: ['bower_components/font-awesome/fonts/*'],
						dest: 'fonts/',
						filter: 'isFile'
					}
				]
			}
		},
		// Combine:
		concat: {
			dist: {
				src: [
					'bower_components/jquery-waypoints/waypoints.min.js',
					'bower_components/owlcarousel/owl-carousel/owl.carousel.min.js',
					'bower_components/headroom.js/dist/headroom.min.js',
					'bower_components/headroom.js/dist/jQuery.headroom.min.js',
					'bower_components/jquery-scrolldepth/jquery.scrolldepth.min.js',
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
			build: {
				options: {
					paths: ['css'],
					sourceMap : true
				},
				files: {
					'css/main.css': 'css/main.less'
				}
			}
		},
		// Clean unused CSSS
		uncss: {
			dist: {
				files: {
					'css/main.css' : 'views/main.php',
				},
				options: {
					urls: ['http://localhost/timm.stokke.me/index.php?setenv=live'],
					ignore: ['animate', 'flipInX', 'flipOutX', 'slideInDown', 'slideOutUp', 'slideInLeft', 'slideOutLeft'],
					report: 'min' // optional: include to report savings
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'css/main.min.css': ['css/main.css']
				},
				options: {
					report: 'min' // optional: include to report savings
				}
			}
		},
		// Watch
		watch: {
			options : {
				livereload: false,
			},
			scripts: {
				files: ['js/*.js', '!js/main.min.js'],
				tasks: ['concat', 'uglify'],
				options: {
					livereload: true
				},
			},
			less: {
				files: ['css/*.less', 'css/assets/*.less'],
				tasks: ['less:development'],
				options: {
					livereload: false
				}
			},
			css: {
				files: ['css/*.css'],
				options: {
					livereload: true
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
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.registerTask('default', ['concat', 'uglify', 'less', 'watch']);

	grunt.registerTask('dist', [
		'copy',
		'concat',
		'uglify',
		'imagemin',
		'less',
		// 'uncss', // Needs this fixed: https://github.com/addyosmani/grunt-uncss/issues/114
		'cssmin']);

};
