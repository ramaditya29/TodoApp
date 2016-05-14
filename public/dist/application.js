angular.module("TodoApp", ['ngResource', 'ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/tasks");

		$stateProvider
			.state('create', {
				url: '/create',
				templateUrl: 'src/views/create.client.tpl.html',
				controller: 'createCtrl'
			})
			.state('tasks', {
				url: '/tasks',
				templateUrl: 'src/views/list.client.tpl.html',
				controller: 'listCtrl'
			})
			.state('edit', {
				url: '/edit/:id',
				templateUrl: 'src/views/edit.client.tpl.html',
				controller: 'editCtrl'
			});
	});;angular
	.module('TodoApp')
	.controller('listCtrl', ['$scope', 'TodoService', function($scope, TodoService){
		$scope.title = ['Id', 'Task', 'Date', ''];
		$scope.tasks = TodoService.query();
		console.log($scope.tasks);
		//console.log("Entered");
		$scope.deleteTodo = function(id){
			console.log(id);
			TodoService.delete({id: id});
			$scope.tasks = TodoService.query();
		};
	}])
	.controller('createCtrl', ['$scope', 'TodoService', function($scope, TodoService){
		$scope.data = {};
		$scope.addTask = function(data){
			TodoService.save({work: data.workname, description: data.tasks ,date: data.date });
			alert("Successfully added to your todo list");
			$scope.data = {};
		};
	}])
	.controller('editCtrl', ['$scope', 'TodoService', '$stateParams', '$location' , function($scope, TodoService, $stateParams, $location){
		$scope.data = TodoService.get({id: $stateParams.id});
		$scope.updateTask = function(data){
			$scope.data.$update(function(){
				alert("Contact successfully Updated");
			});

			$location.url("/tasks");
		};
	}]);;angular
	.module("TodoApp")
	.directive("input", function() {
	    return {
	        require: 'ngModel',
	        link: function(scope, elem, attr, modelCtrl) {
	            if (attr['type'] === 'date'){
	                modelCtrl.$formatters.push(function(modelValue) {
	                    if (modelValue){
	                    	console.log(modelValue);
	                        return new Date(modelValue);
	                    }
	                    else {
	                        return null;
	                    }
	                });
	            }

	        }
	    };
	});;angular
	.module('TodoApp')
	.service('TodoService', function($resource){
		return $resource('/api/todo/:id', {id: '@id'}, {
			 'update' : {method: 'PUT'}
		});
	});