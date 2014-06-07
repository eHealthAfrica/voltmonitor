/**
 * Created by ado on 6/5/14.
 */

'use strict';

angular.module('voltsapp').factory('sensorsService', function($resource) {
    return $resource(':protocol//:server/:db/:q/:r/:s/:t', {
            protocol: 'http:', server: 'localhost:5984', db: 'db-sensors'
        }
    );
});

//angular.module('voltsapp').factory('voltsService',['$resource', function($resource) {
//    return $resource(':protocol//:server/:db/:q/:r/:s/:t', {
//            protocol: 'http:', server: 'localhost:5984', db: 'volts'
//        }
//    );
//}]);