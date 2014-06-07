/**
 * Created by ado on 6/5/14.
 */

'use strict';

angular.module('voltsapp').controller('HomeCtrl', function($scope, $stateParams, sensorsService) {

    $scope.sensors = sensorsService.get({q:'_all_docs', include_docs: 'true', limit: 25});
//    console.log(volts);
//    $scope.volts = volts;
//    if ($state == 'data') {
//        // $scope.volts = VoltsService.get({q:'_design', r:'volts', s:'_view', t:'volts', key:"\""+$routeParams.logger_sn+"\""});
//        $scope.volts = volts;
//        console.log($scope.volts);
//    }

});

angular.module('voltsapp').controller('DataCtrl', function($scope, $stateParams, sensorsService) {

    //$scope.sensors = sensorsService.get({q:'_all_docs', include_docs: 'true', limit: 25});
    console.log($stateParams);
//    console.log(volts);
//    $scope.volts = volts;
//    if ($state == 'data') {
//        // $scope.volts = VoltsService.get({q:'_design', r:'volts', s:'_view', t:'volts', key:"\""+$routeParams.logger_sn+"\""});
//        $scope.volts = volts;
//        console.log($scope.volts);
//    }

});