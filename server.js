/* jshint node: true */
"use strict";

var config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk'),
	http = require('http');


var db = mongoose.connect(config.db, function(error){
	if(error){
		console.log(chalk.red("Error in connecting to the database"));
		console.log(chalk.red(error));

	}
	console.log(chalk.blue("Connected to DB"));
});	


var app = require('./config/express')(db);

app.listen(config.port , function(error){
	if(error){
		console.log(chalk.red("Error in starting the application"));
		console.log(chalk.red(error));
	}
	console.log(chalk.blue("http://localhost:" + config.port));
});


module.exports = app;