//import mapboxgl from 'mapbox-gl';
//import axios from 'axios';
import { connect } from 'react-redux';

import { topoToGeojson } from 'app/api/helpers';
import * as actions from 'app/actions/actions';
import d3 from 'd3';

export default class PointsOverlay {
    constructor(map, source, layer) {
        this.map = map;
        this.name = source.id;
        this.source = source;
        this.layer = layer;
        this.isVisible = false;
        this.paint = function() {
            return {
                'circle-radius': 10,
                'circle-color': '#000000'
            };
        };

        //this.sourceName = Object.keys(overlay.data.objects)[0];
        this.data = topoToGeojson(source.data);
        this.addSource(this.name, this.data);
        this.addLayer(this.name, this.data);
        ////this.initMouseMove();
    }

    // Add's source to Mapboxgl Map
    addSource(title, data) {
        this.map.addSource(title, {
            type: 'geojson',
            data: data
        });
    }

    removeSource() {
        this.map.removeSource(this.name);
    }

    fitBounds() {
        this.map.fitBounds(d3.geo.bounds(this.data));
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
            paint: this.paint(),
            layout: {
                "visibility": "none"
            }
        });

        // TODO Hover needs to be flexible to accept a filter parameter,
        // and return an array with the approriate values
        //this.map.addLayer({
            //id: title + '-hover',
            //type: 'circle',
            //source: title,
            //interactive: true,
            //filter: ['==', 'data', 'Taste/Odor, Chemical (QA2)'],
            //paint: {
                //'circle-radius': 10,
                //'circle-color': '#aaaaaa'
            //}
        //});
    }

    removeLayer() {
        console.log('points overlay source name', this.name);
        this.map.removeLayer(this.name);
        this.map.removeLayer(this.name+ '-hover');
        //this.dispatch(actions.removeLayer({
            //id: this.name
        //}));
        //this.dispatch(actions.removeLayer({
            //id: this.name+ '-hover'
        //}));
    }

    //initMouseMove() {
        //this.map.on('mousemove', (e) => {
            //var features = this.map.queryRenderedFeatures(e.point, {
                //layers: [this.name]
            //});

            //if (features.length) {
                //var feature = features[0];
                //if (feature.properties.hasPopupContent) {
                    //this.dispatch(actions.setPopupContent(feature.properties.popupContent));
                //}
                //else {
                    //this.dispatch(actions.hidePopup());
                //}
            //} else {
                //this.dispatch(actions.hidePopup());
            //}
        //});
    //}
    hideLayer() {
        this.map.setLayoutProperty(this.name, 'visibility', 'none');
    }

    showLayer() {
        this.map.setLayoutProperty(this.name, 'visibility', 'visible');
    }
}

//export default connect((state) => {
    //return {

    //};
//})(PointsOverlay);