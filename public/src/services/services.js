angular
	.module('TodoApp')
	.service('TodoService', function($resource){
		return $resource('/api/todo/:id', {id: '@id'}, {
			 'update' : {method: 'PUT'}
		});
	});