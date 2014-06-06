'use strict';

console.log("app.js");

angular.module('voltsapp', [
        'ngRoute',
        'ngResource'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        }).when('/data', {
            templateUrl: 'templates/data.html',
            controller: 'DataCtrl'
        }).otherwise({
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        });
    }]);