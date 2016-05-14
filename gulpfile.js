var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var watchFiles = {
	serverJS: ['gruntfile.js', 'app/**/*.js', 'config/**/*.js'],
	serverViews: ['app/views/**.html'],
	clientJS: ['public/src/app.js', 'public/src/**/*.js'],
	clientViews: ['public/src/**/*.html'],
	mochaTests: ['app/tests/*'],
	karmaTests: ['public/tests/*.js']
}; 


gulp.task('watch', function(){
	watch(watchFiles.serverJS.concat(watchFiles.serverViews, watchFiles.clientJS, watchFiles.clientViews));
});

gulp.task('start', ['watch'],function(){
	nodemon({
	    script: 'server.js',
	    ext: 'js html',
	    env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('lint', function(){
	return gulp.src(watchFiles.serverJS.concat(watchFiles.clientJS))
    	.pipe(jshint());
});

gulp.task('mocha', function () {
	return gulp.src(watchFiles.mochaTests, {read: false})
		// gulp-mocha needs filepaths so you can't have any plugins before it 
		.pipe(mocha({reporter: 'mochawesome'}));
});

gulp.task('karma', function() {
  gulp.src('public/**/*.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('test', ['mocha', 'karma']);

gulp.task('uglify', function(){
	return gulp.src(watchFiles.clientJS)
	    .pipe(concat('gulpapp.min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('public/dist'));
});



gulp.task('build', ['uglify']);
