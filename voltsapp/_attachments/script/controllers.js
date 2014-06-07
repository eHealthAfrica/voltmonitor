/**
 * Created by ado on 6/5/14.
 */

'use strict';

angular.module('voltsapp').controller('HomeCtrl', function($scope, $stateParams, sensorsService) {

    $scope.sensors = sensorsService.get({q:'_all_docs', include_docs: 'true', limit: 25});

});

angular.module('voltsapp').controller('DataCtrl', function($scope, $stateParams, volts) {

    //$scope.sensors = sensorsService.get({q:'_all_docs', include_docs: 'true', limit: 25});
    $scope.volts = volts;

});