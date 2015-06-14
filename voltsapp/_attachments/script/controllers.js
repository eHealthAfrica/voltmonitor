/**
 * Created by ado on 6/5/14.
 */

'use strict';

app.controller('HomeController', ['$scope', 'sensors', function($scope, sensors) {
    console.log('HomeController');
    var hc = this;
    hc.sensors = {};
    hc.sensors = sensors;
}]);

//<script type="text/javascript" charset="utf-8">
//    $(document).ready(function () {
//        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//                osmAttrib='Map data © OpenStreetMap contributors',
//                osm = L.tileLayer(osmUrl, {minZoom: 6, maxZoom: 18, attribution: osmAttrib});
//
//        var map = L.map('map', {
//            center: new L.LatLng(11.995840, 8.549367),
//            zoom: 8,
//            minZoom: 6,
//            maxZoom: 18
//        });
//
//        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//			maxZoom: 18,
//			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//		}).addTo(map);
//
//        var scope = $('body').scope();
//        console.log(scope);
//
////        var sensor_docs = scope.sensors.rows;
////
////        $.each(sensor_docs, function(k,v) {
////            var location = v.doc.location;
////            var sensor_tag = v.doc.sensor_tag;
////            var sensor_sn = v.doc.sensor_sn;
////            var logger_sn = v.doc.logger_sn;
////            var gps_s = v.doc.gps;
////            var gps_spl = gps_s.split(',');
////
////            L.marker([parseFloat(gps_spl[0]), parseFloat(gps_spl[1])]).addTo(map)
////                    .bindPopup("<b><a href=\'#/data/"+logger_sn+"\'>"+sensor_tag+": "+location+"</a></b><br />("+logger_sn+":"+sensor_sn+")").openPopup();
////        });
//
//    });
//
//</script>


app.controller('DataController', ['$scope', '$stateParams', 'volts', 'sensors', function($scope, $stateParams, volts, sensors) {
    var dc = this;
    dc.sensors = {};
    dc.logger = "";

    dc.sensors = sensors;
    dc.logger = $stateParams.logger;

    console.log(sensors);
    console.log(volts);

    // Create data series array from volts object [[d1,v1],[d2,v2] ...]
    var volts_ar = [];
    $.each(volts.rows, function(k, i) {
        var dr = new Date(i.value[0]);
        var vr = parseFloat(i.value[1]);
        volts_ar.push([dr, vr]);
    });
    // Sort resulting array by date
    volts_ar.sort(function(a,b) {
       return a[0] - b[0]
    });

    dc.chartConfig1 = {
        options: {
            chart: {
                zoomType: 'x'
            },
            xAxis: {
                type: 'datetime', //, minRange: 14 * 24 * 3600000 // fourteen days
                tickInterval: 24 * 3600 * 1000 * 14
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
                        radius: 1
                    },
                    lineWidth: 0.5,
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
            name: dc.logger,
            data: volts_ar
        }],
        title: {
            text: 'Cumlative Voltage Readings (5 min intervals)'
        },
        loading: false
    };

}]);