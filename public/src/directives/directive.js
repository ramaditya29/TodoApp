angular
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
	});