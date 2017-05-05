/*
 * MapCore.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'underscore';

class MapCore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            center: this.props.center || [-74.0193459, 40.6809955],
            zoom: this.props.zoom || 10,
            pitch: this.props.pitch || 0,
            bearing: this.props.bearing || 0,
            loading: true
        };

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
        const { mapId } = this.props;
        // const { containerId } = this.props;
        // mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaXE4OG1jMmEwMHZrZm5ra29sOXYxbXp1In0.BQMZZ9aI39WOAzLgdYZF3A';
        this.map = new mapboxgl.Map({
            container: mapId,
            style: 'mapbox://styles/mapbox/light-v9',
            center: this.state.center,
            zoom: this.state.zoom,
            pitch: this.state.pitch
        });

        this.map.on('load', () => {
            this.setState({
                loading: false
            });

            if (this.props.mapData) {
                this.renderData(this.props.mapData.data);
                if (this.props.mapData.center) {
                    this.flyTo(
                        this.props.mapData.center,
                        this.props.mapData.zoom,
                        this.props.mapData.pitch,
                        this.props.mapData.bearing
                    );
                }
            }

            this.initializeMouseHandlers();
        });
    }


    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props, prevProps)) {
            const mapData = this.props.mapData;
            this.renderData(mapData.data);

            if (mapData.center) {
                this.flyTo(mapData.center, mapData.zoom, mapData.pitch, mapData.bearing);
            }
        }
    }

    initializeMouseHandlers() {
        const { onMouseMove } = this.props;
        this.map.on('mousemove', e => {
            const features = this.map.queryRenderedFeatures(e.point, { layers: this.layers });
            onMouseMove(e, features);
        });
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

    addCircleFeatures(data) {
        // If this is a single geojson feature, and it has a LABEL property,
        // add a label to the map
        // if (data.data.type === 'Feature') {
        //     if (data.data.properties.LABEL) {
        //         this.layers.push(`${data.id}-text`);
        //         this.map.addLayer({
        //             id: `${data.id}-text`,
        //             type: 'symbol',
        //             source: data.id,
        //             layout: {
        //                 visibility: 'visible',
        //                 'text-field': '{LABEL}',
        //                 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        //                 'text-size': 14,
        //                 'text-offset': [1, 0],
        //                 'text-anchor': 'left'
        //             },
        //             paint: {
        //                 'text-color': '#ffffff'
        //             }
        //         });
        //     }
        // }
        this.map.addLayer({
            id: data.id,
            type: 'circle',
            source: data.id,
            paint: {
                'circle-color': data.circleColor || '#225378'
            }
        });
        this.layers.push(`${data.id}-text`);
        this.map.addLayer({
            id: `${data.id}-text`,
            type: 'symbol',
            source: data.id,
            layout: {
                'text-field': '{LABEL}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-size': 9,
                'text-offset': [1, 0],
                'text-anchor': 'left'
            }
        });
    }

    addFillFeature(data) {
        this.map.addLayer({
            id: data.id,
            type: 'fill',
            source: data.id,
            paint: {
                'fill-color': data.fillColor || '#ffffff',
                'fill-opacity': 0.8,
                'fill-outline-color': data.fillOutlineColor || '#ffffff',
                'fill-antialias': true
            }
        });
    }

    clearSourcesAndLayers() {
        this.layers.forEach(this.removeLayer);
        this.sources.forEach(this.removeSource);
    }

    removeLayer(layerId) {
        this.map.removeLayer(layerId);
        this.layers = [];
    }

    removeSource(sourceId) {
        this.map.removeSource(sourceId);
        this.sources = [];
    }

    renderData(data) {
        this.clearSourcesAndLayers();
        console.log('map data', data);
        const directData = d => {
            switch (d.type) {
                case 'point':
                    this.renderPoint(d);
                    break;
                case 'points':
                    this.renderPoints(d.data);
                    break;
                case 'geojson':
                    this.renderGeojson(d);
                    break;
                case 'symbol':
                    this.renderSymbol(d);
                    break;
                default:
                    break;
            }
        };

        if (Array.isArray(data)) {
            data.forEach(d => {
                directData(d);
            });
        } else {
            directData(data);
        }
    }
    renderSymbol(data) {
        this.sources.push(data.id);
        this.layers.push(data.id);
        this.map.addSource(data.id, {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [data.longitude, data.latitude]
                },
                properties: {
                    title: data.label
                }
            }
        });

        // TODO: Fix image property
        this.map.loadImage(data.icon, (err, img) => {
            try {
                this.map.addImage(`${data.id}-img`, img);
            } catch (e) {
                console.log('error', e);
            }

            this.map.addLayer({
                id: data.id,
                type: 'symbol',
                interactive: true,
                source: data.id,
                layout: {
                    visibility: 'visible',
                    'icon-image': `${data.id}-img`,
                    'icon-size': 1,
                    'text-field': '{title}',
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-size': 24,
                    'text-offset': [1, 0],
                    'text-anchor': 'left'
                },
                paint: {
                    'text-color': 'black'
                }
            });
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
                this.addFillFeature(data);
                break;
            default:
                break;
        }
    }


    renderPoints(points) {
        points.forEach(this.renderPoint);
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

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '100%' }} id={this.props.mapId} />
            </div>
        );
    }
}

MapCore.defaultProps = {
    center: null,
    pitch: 0,
    zoom: 0,
    bearing: 0,
    containerId: '',
    mapData: {},
    onMouseMove: () => {}
};

MapCore.propTypes = {
    center: React.PropTypes.array,
    pitch: React.PropTypes.number,
    zoom: React.PropTypes.number,
    bearing: React.PropTypes.number,
    // containerId: React.PropTypes.string,
    mapData: React.PropTypes.object,
    onMouseMove: React.PropTypes.func,
    mapId: React.PropTypes.string.isRequired
};

export default MapCore;
