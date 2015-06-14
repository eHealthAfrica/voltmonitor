/**
 * Created by ado on 6/5/14.
 */

'use strict';

app.factory('sensorFactory', ['$resource', function($resource) {
    console.log('sensorFactory');
    return $resource(':protocol//:server/:db/:q/:r/:s/:t', {
            protocol: 'http:', server: 'localhost:5984', db: 'db-sensors'
        }
    );
}]);

//angular.module('voltsApp').factory('sensorsService', function($resource) {
//    return $resource(':protocol//:server/:db/:q/:r/:s/:t', {
//            protocol: 'http:', server: 'localhost:5984', db: 'db-sensors'
//        }
//    );
//});

app.factory('voltsService',['$resource', function($resource) {
    return $resource(':protocol//:server/:db/:q/:r/:s/:t', {
            protocol: 'http:', server: 'localhost:5984', db: 'volts'
        }
    );
}]);

app.factory('vlogsService',['$resource', function($resource) {
    return $resource(':protocol//:server/:db/:q/:r/:s/:t', {
            protocol: 'http:', server: 'localhost:5984', db: 'volts-logfiles'
        }
    );
}]);