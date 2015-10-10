'use strict';

angular.module('littlebrother.level1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/level1', {
        templateUrl : 'javascript/Levels/level1.html',
        controller  : 'level1Ctrl'
    })
}])

// create the controller and inject Angular's $scope
.controller('level1Ctrl', ["$scope",  function($scope) {

    ///do things here
    $scope.name = "Level name, I think?"
    
    
}]);