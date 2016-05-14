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
	});