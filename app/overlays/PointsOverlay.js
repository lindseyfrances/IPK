//import mapboxgl from 'mapbox-gl';
//import axios from 'axios';
import { connect } from 'react-redux';

import { topoToGeojson } from 'app/api/helpers';
import * as actions from 'app/actions/actions';
import d3 from 'd3';

export default class PointsOverlay {
    constructor(map, layer) {
        this.map = map;
        this.name = layer.key;
        //this.source = source || null;
        this.layer = layer || null;
        this.isVisible = false;
        this.paint = function() {
            return {
                'circle-radius': 10,
                'circle-color': '#000000'
            };
        };

        // Convert the data to Geojson if we recieve Topojson, otherwise leave
        // it alone
        this.data = layer.data.type === 'Topology' ? topoToGeojson(layer.data) : layer.data;
        this.addSource(this.name, this.data);
        this.addLayer(this.name, this.data);

        // Fit bounds on first creation
        this.fitBounds();
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
        // Only fit bounds if we have more than one item in the feature
        // collection
        // Otherwise, just fly to the location of the point object
        if (this.data.features.length > 1) {
           this.map.fitBounds(d3.geo.bounds(this.data));
        } else if (this.data.features.length === 1) {
            this.map.flyTo({
                center: this.data.features[0].geometry.coordinates
            });
        }
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
        this.fitBounds();
    }
}

//export default connect((state) => {
    //return {

    //};
//})(PointsOverlay);
