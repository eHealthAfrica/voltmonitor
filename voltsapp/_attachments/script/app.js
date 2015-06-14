'use strict';

var app = angular.module('voltsApp', ['ngResource','ui.router','highcharts-ng', 'leaflet-directive']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "templates/home.html",
            resolve: {
                sensorFactory: 'sensorFactory',
                sensors: function(sensorFactory) {
                    console.log("loading sensors hc");
                    return sensorFactory.get({q:'_all_docs', include_docs: 'true'}).$promise;
                }
            },
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .state('data', {
            url: "/data/:logger",
            templateUrl: "templates/data.html",
            resolve: {
                voltsService: 'voltsService',
                volts: function(voltsService, $stateParams) {
                    console.log("loading volts dc");
                    var logger = $stateParams.logger;
                    return voltsService.get({q:'_design', r:'volts', s:'_view', t:'volts', key:logger, descending:true, limit:10000}).$promise;
                },
                sensorFactory: 'sensorFactory',
                sensors: function(sensorFactory) {
                    console.log("loading sensors dc");
                    return sensorFactory.get({q:'_all_docs', include_docs: 'true'}).$promise;
                }
            },
            controller: 'DataController',
            controllerAs: 'dc'
        });
}]);
