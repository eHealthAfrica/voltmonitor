/**
 * Created by ado on 6/5/14.
 */

'use strict';

angular.module('voltsapp').controller('HomeCtrl', function($scope, $stateParams, sensorsService) {

    $scope.sensors = sensorsService.get({q:'_all_docs', include_docs: 'true', limit: 25});

});

angular.module('voltsapp').controller('DataCtrl', function($scope, $stateParams, volts, volts_hour_stats) {

    // $scope.volts = volts;
    // $scope.volts_hour_stats = volts_hour_stats;
    $scope.logger = $stateParams.logger;

    // Create data series array from volts object [[d1,v1],[d2,v2] ...]
    var volts_ar = [];
    $.each(volts.rows, function(k, i) {
        var vr = parseFloat(i.value[1]);
        var dr = new Date(i.value[2]);
        volts_ar.push([dr, vr]);
    });
    // Sort resulting array by date
    volts_ar.sort(function(a,b) {
       return a[0] - b[0]
    });

    $scope.chartConfig1 = {
        options: {
            chart: {
                zoomType: 'x'
            },
            xAxis: {
                type: 'datetime', //, minRange: 14 * 24 * 3600000 // fourteen days
                tickInterval: 24 * 3600 * 1000 * 2
            },
            yAxis: {
                title: {
                    text: 'Voltage (V)'
                },
                floor: 0,
                ceiling: 350
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            }
        },
        series: [{
            type: 'area',
            name: $stateParams.logger,
            data: volts_ar
        }],
        title: {
            text: 'Cumlative Voltage Readings (5 min intervals)'
        },
        loading: false
    };

    // create
    var volts_avg = [];
//    var volts_max = [];
    var volts_minmax = [];
    $.each(volts_hour_stats.rows, function(k, i) {
        var dr = new Date(i.value[0]);
        var v_avg = parseFloat(i.value[1]);
        var v_max = parseFloat(i.value[2]);
        var v_min = parseFloat(i.value[3]);
        volts_avg.push([i.value[0], v_avg]);
        //volts_max.push([dr, v_max]);
        volts_minmax.push([v_max, v_min]);
    });

    $scope.chartConfig2 = {
        options: {
            chart: {
                zoomType: 'x'
            },
            xAxis: {
//                type: 'datetime', //, minRange: 14 * 24 * 3600000 // fourteen days
//                tickInterval: 24 * 3600 * 1000 * 2
            },
            yAxis: {
                title: {
                    text: 'Voltage (V)'
                },
                floor: 0,
                ceiling: 350
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            }
        },
        series: [{
            type: 'area',
            name: 'Hourly Average',
            data: volts_avg
        },
        {
            type: 'errorbar',
            name: 'Min - Max',
            data: volts_minmax
        }],
        title: {
            text: 'Hourly Summary Data'
        },
        loading: false
    };

});