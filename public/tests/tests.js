describe("Main Test", function(){
	var $controller;
	
	beforeEach(angular.mock.module('TodoApp'));

	beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
	}));
	

	describe("Todo API", function(){
		var $scope;
		var $httpBackend, Todo , $controller;

		beforeEach(angular.mock.inject(function ($injector) {
		    
		    Todo = $injector.get('TodoService');
		    
		}));

		beforeEach(angular.mock.inject(function(_$controller_, _$httpBackend_){
			$httpBackend = _$httpBackend_;
			$controller = _$controller_;
			//Contact = $injector.get('Contact');
		}));

		it("Get All the list from the /api/todo", function(){

			$httpBackend.whenGET('/api/todo')
				.respond([
					 { date: "2016-10-23", task: 'Gulp', description: 'Sample Data', _id: 1, __v:0},
					 { date: "2016-10-25", task: 'Docker', description: 'Sample Docker', _id: 2, __v:0}
					]);

			$scope = {};	
			//$httpBackend.expectGET('src/views/list.client.tpl.html').respond("My Data");
			var controller = $controller('listCtrl', {$scope: $scope});
			$scope.tasks = Todo.query();
			
		    $httpBackend.flush();

		    expect($scope.tasks).toBeDefined();
		    expect($scope.tasks.length).toBe(2);
		    expect($scope.tasks[0].task).toBe('Gulp');
		    expect($scope.tasks[1].task).toBe('Docker');
		});
		it("Create new todo using /api/todo", function(){

			var todo = {work: "Gulp", description: "Automation" ,date: "2016-10-23" };
			$httpBackend.whenPOST('/api/todo',
			    function(postData) {
			        jsonData = JSON.parse(postData);
			        expect(jsonData.work).toBe(todo.work);
			        expect(jsonData.description).toBe(todo.description);
			       
			        return true;
			    })
				.respond(200, true );
		});
		afterEach(function () {
		    //$httpBackend.verifyNoOutstandingExpectation();
		    //$httpBackend.verifyNoOutstandingRequest();
		});
	});

	
});