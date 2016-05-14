/* jshint node: true */
/* jshint strict: true */
"use strict";

var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var _todoSchema = new schema({
	task: {
		type: String
	},
	description: {
		type: String
	},
	user: {
		type: String
	},
	date: {
		type: String
	}
});

var db = mongoose.model('todo', _todoSchema);

module.exports = db;