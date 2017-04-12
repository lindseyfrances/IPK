/*
 * MapCore.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import mapboxgl from 'mapbox-gl';

class MapCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: this.props.center || [-74.0193459, 40.6809955],
            zoom: this.props.zoom || 10,
            pitch: this.props.pitch || 0,
            bearing: this.props.bearing || 0,
            loading: true
        }

        this.renderPoint = this.renderPoint.bind(this);
        this.renderPoints = this.renderPoints.bind(this);
        this.renderData = this.renderData.bind(this);
        this.renderGeojson = this.renderGeojson.bind(this);
        this.initializeMouseHandlers = this.initializeMouseHandlers.bind(this);
        this.clearSourcesAndLayers = this.clearSourcesAndLayers.bind(this);
        this.removeLayer = this.removeLayer.bind(this);
        this.removeSource = this.removeSource.bind(this);
        this.flyTo = this.flyTo.bind(this);
        this.layers = [];
        this.sources = [];
    }

    componentDidMount() {
        const { containerId } = this.props;
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: this.state.center,
            zoom: this.state.zoom,
            pitch: this.state.pitch
        });

        this.map.on('load', () => {
            this.setState({
                loading: false
            });

            if (this.props.mapData) {
                this.renderData(this.props.mapData);
            }

            this.initializeMouseHandlers();
        })
    }

    initializeMouseHandlers() {
        const { onMouseMove } = this.props;
        this.map.on('mousemove', e => {
            const features = this.map.queryRenderedFeatures(e.point, { layers: this.layers});
            onMouseMove(features);
        });
    }

    componentDidUpdate() {
        let mapData = this.props.mapData;
        this.renderData(mapData);
        if (mapData.center) {
            this.flyTo(mapData.center, mapData.zoom, mapData.pitch, mapData.bearing);
        }
    }

    flyTo(center, zoom, pitch, bearing) {
        let c;
        if (center.length === undefined) {
            // object
            c = [center.longitude, center.latitude];
        } else {
            c = center;
        }

        this.map.flyTo({
            center: c,
            zoom: zoom === undefined ? 10 : zoom,
            pitch: pitch === undefined ? 0 : pitch,
            bearing: bearing === undefined ? 0 : bearing
        });
    }

    renderPoint(point) {
        this.sources.push(point.id);
        this.layers.push(point.id);
        this.layers.push(`${point.id}-text`);

        this.map.addSource(point.id, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [point.longitude, point.latitude]
                        },
                        properties: {
                            title: point.label,
                            prjId: point.id
                        }
                    }
                ]
            }
        });
        this.map.addLayer({
            id: point.id,
            type: 'circle',
            interactive: true,
            source: point.id,
            paint: {
                'circle-radius': 9,
                'circle-color': '#2b8cbe'
            },
            layout: {
                visibility: 'visible'
            }
        });
        this.map.addLayer({
            id: `${point.id}-text`,
            type: 'symbol',
            interactive: true,
            source: point.id,
            layout: {
                visibility: 'visible',
                'text-field': '{title}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-size': 24,
                'text-offset': [1, 0],
                'text-anchor': 'left'
            },
            paint: {
                'text-color': '#ffffff'
            }
        });
    }

    renderPoints(points) {
        points.forEach(this.renderPoint);
    }

    addCircleFeatures(data) {
        this.map.addLayer({
            id: data.id,
            type: 'circle',
            source: data.id,
            paint: {
                'circle-color': '#abcabc'
            }
        });
    }

    addFillFeatures(data) {
        this.map.addLayer({
            id: data.id,
            type: 'fill',
            source: data.id,
            paint: {
                'fill-color': '#abcabc',
                'fill-opacity': 0.8
            }
        });
    }

    renderGeojson(data) {
        this.sources.push(data.id);
        this.layers.push(data.id);

        this.map.addSource(data.id, {
            type: 'geojson',
            data: data.data
        });

        switch (data.featureType) {
            case 'circle':
                this.addCircleFeatures(data);
                break;
            case 'fill':
                this.addFillFeatures(data);
                break;
        }
    }

    renderData(data) {
        this.clearSourcesAndLayers();
        switch (data.type) {
            case 'point':
                this.renderPoint(data);
                break;
            case 'points':
                this.renderPoints(data.data);
                break;
            case 'geojson':
                this.renderGeojson(data);
                break;
        }
        // data.forEach(point => {
        // });
    }

    removeLayer(layerId) {
        this.map.removeLayer(layerId);
        this.layers = [];
    }

    removeSource(sourceId) {
        this.map.removeSource(sourceId);
        this.sources = [];
    }

    clearSourcesAndLayers() {
        this.layers.forEach(this.removeLayer);
        this.sources.forEach(this.removeSource);
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <div style={{width: '100%', height: '100%'}} id='map' />
                <div className='map-popup'>
                </div>
          </div>
        )
    }
}

export default MapCore;
