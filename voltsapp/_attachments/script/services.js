/**
 * Created by ado on 6/5/14.
 */

'use strict';

console.log("services.js");


//angular.module('voltsapp').service('sensorsService', function($q) {
//
//    /**
//     *
//     */
//    this.sensorsList = function(SensorsCouch){
//        SensorsCouch.get({q:'_all_docs', include_docs: 'true', limit: 10});
//    }
//
//});

angular.module('voltsapp').factory('Sensors', function($resource) {
    var resource = $resource(':protocol//:server/:db/:q/:r/:s/:t', {
            protocol: 'http:', server: 'localhost:5984', db: 'db-sensors'
        },
        {
            update: {method:'PUT'}
        }
    );
    return resource;
});

angular.module('voltsapp').factory('Volts', function($resource) {
    var resource = $resource(':protocol//:server/:db/:q/:r/:s/:t', {
            protocol: 'http:', server: 'localhost:5984', db: 'volts'
        },
        {
            update: {method:'PUT'}
        }
    );
    return resource;
});