//import d3 from 'd3';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'

var topojson = require('topojson');

export default class PointsOverlay {
    constructor(map, data) {
        
        // Topojson data must be converted to geojson
        this.map = map;
        //this.sources = [];
        //this.layers = [];
        this.sourceName;
        this.fetching = false;

        var me = this;
        
        // We can either take a url pointing
        // to some geojson data
        // or take an object with the data directly
        if (this.isUrl(data)) {
            this.fetchData(data).then((res) => {
                me.addSource(me.sourceName, me.data);
                me.addLayer(me.sourceName);
            }, (err) => {
                // Were given an object, not a url
                console.log('error fetching data', err);
            });
        } else {
            console.log('data is not a url');
            console.log(data);
            this.sourceName = Object.keys(data.objects)[0];
            this.data = this.topoToGeojson(data);
            this.addSource(this.sourceName, this.data);
            this.addLayer(this.sourceName, this.data);
        }
    }

    isUrl(str) {
        if (str.indexOf) {
            return str.indexOf('http') >= -1;
        }
    }

    topoToGeojson(data) {
        var key = Object.keys(data.objects)[0];
        return topojson.feature(data, data.objects[key]);
    }

    // If we're given a url, request data from the web
    // when it comes back, save ref to data on properties
    // return a promise so it's all chainable
    fetchData(url) {
        this.fetching = true;
        var me = this;

        // Return the promise so I can chain it 
        return axios.get(url)
            .then((res) => {
                me.fetching = false;
                
                if (res.data.type === 'Topology') {
                    // we got a Topjson object, so convert
                    // to geojson
                    var key = Object.keys(res.data.objects)[0];
                    me.sourceName = key;
                    //me.data = topojson.feature(res.data, res.data.objects[key])
                    me.data = me.topoToGeojson(res.data);
                    console.log(me.data);
                } else {
                    console.log('type does not equal topology');
                    // we got geojson right off the bat
                    me.data = res.data;
                }
            })
            .catch((err) => {
                console.log('error fetching data', err);
            });
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
        this.map.addLayer({
            id: title,
            type: 'circle',
            source: title,
            paint: {
                'circle-radius': 10,
                'circle-color': '#fabfab'
            }
        });
    }

    removeLayer() {
        this.map.removeLayer(this.sourceName);
    }

    hideLayer() {
        this.map.setLayoutProperty(this.sourceName, 'visibility', 'none');
    }

    showLayer() {
        this.map.setLayoutProperty(this.sourceName, 'visibility', 'visible');
    }
}

