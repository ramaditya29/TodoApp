/* jshint node: true */
/* jshint strict: true */
"use strict";

var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser');


module.exports = function(app){

	var controller = require('../../app/controllers/todo.server.controller.js');
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({ extended: false }));
	router
		.route('/todo')
		.post(controller.create)
		.get(controller.all)
		.put(controller.update);

	router
		.route('/todo/:id')
		.delete(controller.remove)
		.get(controller.retrieve);	

	app.use('/api', router);	
};