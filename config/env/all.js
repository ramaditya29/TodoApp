/* jshint node: true */
/* jshint strict: true */
module.exports = {
	port: 3000,
	templateEngine: "swig",
	assets: {
		lib:{
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/font-awesome/css/font-awesome.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js'
			]
		},
		app: {
			css: [],
			js: [
				'public/src/app.js',
				'public/src/controllers/controller.js',
				'public/src/services/services.js',
				'public/src/directives/directive.js'
			]
		},
		tests: []
	}
};