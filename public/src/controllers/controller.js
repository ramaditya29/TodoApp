angular
	.module('TodoApp')
	.controller('mainCtrl', ['$scope', '$location' , function($scope, $location){
		$scope.menuClass = function(page){
			var current = $location.path().substring(1);
			return page === current ? "active" : "";
		};
	}])
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
	}]);