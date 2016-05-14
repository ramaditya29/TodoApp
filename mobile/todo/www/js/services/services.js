angular.module('todoApp')
	.factory('todoService', function($http){
		var url = "http://localhost:3000";

		return {
			getAll: function(){
				var todoList = [];
				$http.get('http://localhost:3000/api/todo')
			      .success(function(response){
			        angular.forEach(response, function(child){  
			          todoList.push(child);
			        });

		      	});
			    return todoList;
			},
			getById: function(id){
				
				//var results = {};
				return $http.get('http://localhost:3000/api/todo/' + id)
						.success(function(response){
							return response;
						});
			},
			create: function(data){
				$http.post('http://localhost:3000/api/todo' , data)
					.success(function(data, status){
						console.log("The data is:" , data , "Status:" , status);
					});
			},
			update: function(data){
				$http.put('http://localhost:3000/api/todo' , data)
					.success(function(data, status){
						console.log("Data is:" + data);
					});
			}
		};
	});