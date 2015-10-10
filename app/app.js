'use strict';

var littlebrother = angular.module('littlebrother', ['ngRoute', 'littlebrother.level1']);
// configure our routes
littlebrother.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'Levels/Level1/level1.html',
            controller: 'level1Ctrl'
        })
        // Add more pages by 
        // .when('/page', {
        //     templateUrl: 'views/home.html',
        //     controller: 'MainController'
        // })
        
        .otherwise({redirectTo: '/'});
    }
);

littlebrother.run(function() {
    if(FastClick){
        FastClick.attach(document.body);
    }
});




littlebrother.controller('MainController', ['$scope', function($scope) {

    console.log('hodor');

}]);
