'use strict';

angular.module('voltsapp', ['ngResource','ui.router','highcharts-ng'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "templates/home.html",
                resolve: {
                    sensorsService: 'sensorsService',
                    sensors: function(sensorsService, $stateParams) {
                        return sensorsService.get({q:'_all_docs', include_docs: 'true', limit: 25});
                    }
                },
                controller: 'HomeCtrl'
            })
            .state('data', {
                url: "/data/:logger",
                templateUrl: "templates/data.html",
                resolve: {
                    voltsService: 'voltsService',
                    volts: function(voltsService, $stateParams) {
                        var logger = $stateParams.logger;
                        return voltsService.get({q:'_design', r:'volts', s:'_view', t:'volts', key:logger}).$promise;
                    }
                },
                controller: 'DataCtrl'
            });
    }]);

// startkey=["10509728"]&endkey=["10509728",{}]&