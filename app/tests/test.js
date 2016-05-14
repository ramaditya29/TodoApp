
process.env.NODE_ENV = "testing";

var chai = require('chai');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var todo = require('../models/todo');
var request = require('supertest');
var config = require('../../config/config');
console.log(config.db);
var server = require('../../server');
//console.log(server);
var config = require('../../config/config');
console.log(config.db);
describe("HTML Page", function(){
	it("Checking the Index Page /index", function(done){
		request(server)
			.get('/index')
			.end(function(error, res){
				expect(res).to.have.property('status', 200);
				done();
			});
	});
});
describe("Routes Testing", function(){
	beforeEach(function(done){
		var newTodo = new todo({
	      task: "Sample", description: "Sample Tutorials", user: "Aditya", date: "2016-10-15"
	    });
	    newTodo.save(function(err) {
	      done();
	    });
	});
	afterEach(function(done){
		
		todo.collection.drop();
		done();
	});
	it("Creating the todolist using /api/todo POST", function(done){
		request(server)
			.post('/api/todo')
			.send({work: "Gulp", description: "Gulp Basics", user: "Aditya", date: "2016-10-23"})
			.end(function(error, res){
				expect(res).to.have.property('status',200);
				console.log(res.body);
				expect(res.body).to.equal("Data inserted");
				done();
			});
	});
	it("Retrieving the todolist using /api/todo GET", function(done){
		request(server)
			.get('/api/todo')
			.end(function(error, res){
				expect(res).to.have.property('status',200);
				expect(res).to.be.json;
				expect(res.body).to.be.a('Array');
				expect(res.body[0]).to.be.a('object');
				expect(res.body[0]).to.have.property('task');
				expect(res.body[0]).to.have.property('description');
				expect(res.body[0]).to.have.property('_id');
				expect(res.body[0]).to.have.property('user');
				expect(res.body[0]).to.have.property('date');
				expect(res.body[0].task).to.equal('Sample');
				//console.log(res.body);
				done();
			});
	});
	it("Retrieving the todo based on ID using /api/todo/:id GET", function(done){
		request(server)
			.get('/api/todo')
			.end(function(error, res){
				request(server)
					.get('/api/todo/' + res.body[0]._id)
					.end(function(error, res){
						expect(res).to.have.property('status', 200);
						console.log(res.body);
						expect(res).to.be.json;
						expect(res.body).to.be.json;
						expect(res.body).to.be.a('object');
						expect(res.body).to.have.property('task');
						expect(res.body).to.have.property('description');
						expect(res.body).to.have.property('_id');
						expect(res.body).to.have.property('user');
						expect(res.body).to.have.property('date');
						expect(res.body.task).to.equal('Sample');
						done();
					});
			});
	});
	it("Updating the todo list based on ID using /api/todo/ PUT", function(done){
		request(server)
			.get('/api/todo')
			.end(function(error, res){
				request(server)
					.put('/api/todo/')
					.send({_id: res.body[0]._id ,work: "Gulp Tutorial", description: "Gulp Basics"})
					.end(function(error, res){
						expect(res).to.have.property('status', 200);
						console.log(res.body);
						expect(res).to.be.json;
						expect(res.body).to.equal("Data Successfully updated");
						done();
					});
			});
	});
	it("Delete one todo from todo based on ID using /api/todo/:id DELETE", function(done){
		request(server)
			.get('/api/todo')
			.end(function(error, res){
				request(server)
					.delete('/api/todo/' + res.body[0]._id)
					.end(function(error, resp){
						expect(resp).to.have.property('status', 200);
						expect(resp).to.be.json;
						expect(resp.body).to.equal("Task deleted successfully");

						done();
					});
			});
	});
	
});