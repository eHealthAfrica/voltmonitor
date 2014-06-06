/**
 * Created by ado on 6/5/14.
 */

'use strict';

angular.module('voltsapp').controller('HomeCtrl', function($scope, Sensors, Volts) {

    // SensorsCouch.get({q:'_all_docs', include_docs: 'true', limit: 10});
    $scope.sensors = Sensors.get({q:'_all_docs', include_docs: 'true', limit: 25});
    $scope.volts = Volts.get({q:'_all_docs', include_docs: 'true', limit: 100});
    $scope.map = true;

});

angular.module('voltsapp').controller('DataCtrl', function($scope, Sensors, Volts) {

    // SensorsCouch.get({q:'_all_docs', include_docs: 'true', limit: 10});
    $scope.sensors = Sensors.get({q:'_all_docs', include_docs: 'true', limit: 25});
    $scope.volts = Volts.get({q:'_all_docs', include_docs: 'true', limit: 100});
    $scope.map = false;

});