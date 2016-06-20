//import d3 from 'd3';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { connect } from 'react-redux';

var topojson = require('topojson');

export default class PointsOverlay {
    constructor(map, overlay, paint) {
        
        // Topojson data must be converted to geojson
        this.map = map;
        //this.sources = [];
        //this.layers = [];
        this.sourceName = overlay.id;
        this.fetching = false;
        this.paint = paint || function() {
            return {
                'circle-radius': 10,
                'circle-color': '#000000'
            };
        };

        var me = this;
        
        console.log('data is not a url');
        console.log(overlay.data);
        //this.sourceName = Object.keys(overlay.data.objects)[0];
        this.data = this.topoToGeojson(overlay.data);
        this.addSource(this.sourceName, this.data);
        this.addLayer(this.sourceName, this.data);
    }

    topoToGeojson(data) {
        var key = Object.keys(data.objects)[0];
        console.log('topojson data', data);
        return topojson.feature(data, data.objects[key]);
    }

    // Add's source to Mapboxgl Map
    addSource(title, data) {
        this.map.addSource(title, {
            type: 'geojson',
            data: data
        });
    }

    removeSource() {
        this.map.removeSource(this.sourceName);
    }

    // Draws the layer on the map
    addLayer(title) {
        // TODO: Store layers on state
        // maybe also store visible layers on state
        //var { dispatch } = this.props;
        //dispatch(addLayer(title));
        this.map.addLayer({
            id: title,
            type: 'circle',
            source: title,
            interactive: true,
            paint: this.paint()
        });

        // TODO Hover needs to be flexible to accept a filter parameter,
        // and return an array with the approriate values
        this.map.addLayer({
            id: title + '-hover',
            type: 'circle',
            source: title,
            interactive: true,
            filter: ['==', 'data', 'Taste/Odor, Chemical (QA2)'],
            paint: {
                'circle-radius': 10,
                'circle-color': '#aaaaaa'
            }
        });
    }

    removeLayer() {
        console.log('points overlay source name', this.sourceName);
        this.map.removeLayer(this.sourceName);
        this.map.removeLayer(this.sourceName + '-hover');
    }

    hideLayer() {
        this.map.setLayoutProperty(this.sourceName, 'visibility', 'none');
    }

    showLayer() {
        this.map.setLayoutProperty(this.sourceName, 'visibility', 'visible');
    }
}

//export default connect((state) => {
    //return {

    //};
//})(PointsOverlay);
