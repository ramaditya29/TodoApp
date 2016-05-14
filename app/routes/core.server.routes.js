/* jshint node: true */
/* jshint strict: true */
"use strict";

module.exports = function(app){

	var controller = require('../../app/controllers/core.server.controller');
	app
		.route('/index')
		.get(controller.index);

	
};