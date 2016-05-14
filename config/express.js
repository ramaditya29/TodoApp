/* jshint node: true */
/* jshint strict: true */
"use strict";

var express = require('express'),
	config = require('./config'),
	bodyParser = require('body-parser'),
	path = require('path'),
	consolidate = require('consolidate'),
	swig = require('swig');


module.exports = function(db){
	var app = express();

	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers');
		next();
	});
	config.getGlobbedFiles('./app/models/**/*.models.js'). forEach(function(routePath){
        //console.log(routePath);
        require(path.resolve(routePath));
    });
	//console.log("Hello World");
	//require(path.resolve('./app/routes/core.server.routes'))(app);
	config.getGlobbedFiles('./app/routes/**/*.routes.js'). forEach(function(routePath){
      
      	require(path.resolve(routePath))(app);
    });
   //require(path.resolve('./app/routes/core.server.routes'))(app);
   //require(path.resolve('./app/routes/todo.server.routes'))(app);
	app.engine('server.view.html', consolidate[config.templateEngine]);
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	app.use(express.static(path.resolve('./public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false} ));

	app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();
    
	return app;
};