import d3 from 'd3';
import mapboxgl from 'mapbox-gl';

var topojson = require('topojson');

export default class PointsOverlay {
    constructor(map, containerId, data) {

        this.containerId = containerId;
        // Topojson data must be converted to geojson
        this.data = data;
        this.map = map;


        var key = Object.keys(data.objects)[0];
        var geojson = topojson.feature(data, data.objects[key]);

        map.addSource('waterQuality', {
            type: 'geojson',
            data: geojson
        });
        map.addLayer({
            id: 'waterQuality',
            type: 'circle',
            source: 'waterQuality',
            paint: {
                'circle-radius': 10,
                'circle-color': '#fabfab'
            }
        });
        //var width = window.innerWidth;
        //var height = window.innerHeight;
        //var svg = d3.select(containerId).append('svg')
            //.attr('width', width)
            //.attr('height', height);
        //var projection = d3.geo.mercator()
            //.center([-74.0193459, 40.6809955])
            //.scale(60000)
            //.translate([width / 2, height / 2]);

        //svg.selectAll('circle')
            //.data(data)
            //.enter()
            //.append('circle')
            //.attr('r', 10)
            //.attr('fill', 'red')
            //.attr('cx', function(d) {
                //var latlng = new mapboxgl.LngLat(d.longitude, d.latitude);
                //return map.project(latlng).x;
            //})
            //.attr('cy', function(d) {
                //return map.project(new mapboxgl.LngLat(d.longitude, d.latitude)).y;
            //});
    }

    project(point) {
        var point;
        var lng;
        return {
            lng: 20,
            lat: 20
        };
    }

    enter() {

    }

    update() {

    }

    exit() {

    }
}

