/* jshint node: true */
/* jshint strict: true */
"use strict";

module.exports.index = function(req, res){
	console.log("hello");
	res.render('index', {title: "TodoApp"});
};