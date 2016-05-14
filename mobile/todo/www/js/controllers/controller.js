angular.module('todoApp')
	.controller('listCtrl', function($scope, todoService, $state){
		/*$scope.todoList = [
			{_id: "1", task: "Testing" , description: "Nodejs,Mocha,Istanbul"},
			{_id: "2", task: "Docker", description: "Deployment, Maintenance"}
		];*/
		$scope.todoList = todoService.getAll();
		$scope.new = function(){
			$state.go('add');
		};

	})
	.controller('editCtrl' , function($scope, todoService, $state){
		var id = $state.params.id;
		console.log(id);
		//$scope.todo = {};
		todoService.getById(id).then(function(data){
			$scope.todo = data.data;
			console.log($scope.todo);
		});
		
		$scope.save = function(){
			todoService.update($scope.todo);
			$state.go('list');
		};

		

	})
	.controller('addCtrl', function($scope, todoService, $state){
		$scope.todo = {};
		$scope.save = function(){
			$scope.results = todoService.create($scope.todo);
			$state.go('list');
		};
	});