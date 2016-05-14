/* jshint node: true */
/* jshint strict: true */
"use strict";

var mongoose = require('mongoose'),
	Todo = require('../../app/models/todo'),
	moment = require('moment');

module.exports.create = function(req, res){

	
	console.log("The work name: " + req.body.work);
	console.log("The work date: " + req.body.date);
	//res.send("Creating Data");
	var todo = new Todo({
		task: req.body.work,
		description: req.body.description,
		user: 'Aditya',
		date: moment(req.body.date).format('YYYY-DD-MM')
	});

	todo.save(function(error, todo){
		if(error){
			res.status(400).send("Error in saving data");
			console.log("Error in saving the data");
		}
		console.log(todo);
		res.status(200).json("Data inserted");
	});
};
 
module.exports.remove = function(req, res){
	console.log(req.params.id);
	Todo.findOne({_id: req.params.id}, function(error, todo){
		if(error){
			res.send("Task doesn't exist");
		}
		else{
			todo.remove(function(error){
				if(error){
					res.send("Unable to delete");
				}
				res.status(200).json("Task deleted successfully");
			});
		}

	});
	
	//res.send("Removing Data");
		
};

module.exports.update = function(req, res){
	//res.send("Data Updation");
	console.log("Id: " + req.body._id);
	console.log("Work:" + req.body.task);
	Todo.findOne({_id: req.body._id}, function(error, todo){
		if(error){
			console.log("Error in retrieving the data");
			console.log(error);
			res.send("No Data found");
		}
		else {
			todo.task = req.body.task;
			todo.description = req.body.description;
			//todo.date = req.body.date;
			todo.save(function(error,todo){
				if(error){
					console.log("Error in updating the fields");
					console.log(error);
				}
				else{
					console.log(todo);	
					res.status(200).json("Data Successfully updated");
				}
			});
		}
	});

};
//hello
module.exports.retrieve = function(req, res){
	console.log(req.params.id);
	Todo.findOne({_id: req.params.id}, function(error, todo){
		if(error){
			console.log("Error in retrieving the data");
			console.log(error);
			res.send("No Data found");
		}
		//console.log(todo);
		else
			res.status(200).json(todo);
	});
	//res.send("Data Retrieval");
};

module.exports.all = function(req, res){
	res.setHeader('Content-type', 'application/json');
	Todo.find(function(error, todoData){
		if(error){
			console.log("Error in retrieving data");
			console.log(error);
		}
		else if(todoData.length === 0){
			console.log(todoData.length);
			res.status(404).send("No Data");
		}
		else
			res.status(200).json(todoData);
	});
	//res.send("All Data");
};