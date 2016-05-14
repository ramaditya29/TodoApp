/* jshint node: true */
module.exports = function(grunt){


	var watchFiles = {
		serverJS: ['gruntfile.js', 'app/**/*.js', 'config/**/*.js'],
		serverViews: ['app/views/**.html'],
		clientJS: ['public/src/app.js', 'public/src/**/*.js'],
		clientViews: ['public/src/**/*.html'],
		mochaTests: ['app/tests/*']
	}; 

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        }, 
        concat: {
	    	options: {
	        	separator: ';'
	      	},
	    	dist: {
	        	src: watchFiles.clientJS,
	        	dest: 'public/dist/application.js'
	      	}
	    },
	    uglify: {
	    	dist: {
		        files: {
		          'public/dist/application.min.js': 'public/dist/application.js'
		        }
	      	}
	    },
		nodemon: {
			dev: {
		    	script: 'server.js',
		    	options: {
		    		ext: 'js,html',
		    		watch: watchFiles.serverViews.concat(watchFiles.serverJS)
		    	}
		  	}
		},
		jshint: {
		    all: watchFiles.serverJS.concat(watchFiles.clientJS),
		    options: {
		    	jshintrc: true
		    }
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			options: {
				logConcurrentOuptut: true,
				limit :10
			}
		},
		env: {
			test: {
				NODE_ENV: 'testing'
			},
			secure: {
				NODE_ENV: 'secure'
			}

		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
                require: 'server.js',
                reporter: 'mochawesome'
            }
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');

	
	grunt.registerTask('default', ['nodemon']);

	grunt.registerTask('lint', ['jshint']);

	grunt.registerTask('test', ['env:test','mochaTest', 'karma:unit']);

	grunt.registerTask('build', ['concat', 'uglify']);
};