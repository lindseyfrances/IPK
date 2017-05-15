/* global window */
/****************************************************
 *  Map component
 *      This component manages it's own state
 *      because it should be in charge of what
 *      layers and sources are on it.
 *      If we stored sources and layers
 *      on the store - then watched for those
 *      changes to update what's visible
 *      on the map, it get's messy trying to account
 *      for map movement as well as what
 *      should be displayed at any given moment
 *
 *      Instead, we store the 'location' of the user
 *      on the store, i.e. what 'page' they're on
 *      then adjust the internal map state accoringly
 *
 *      There may be a more pure react + redux
 *      way to do this, but due to Mapbox wanting
 *      to manage it's own component, it makes sense
 *      to break the map state out of react
 *****************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import _ from 'underscore';
import * as actions from 'app/actions/actions';
import { filterListByProperty } from 'app/api/helpers';
import { COLORS } from 'app/constants/CONSTANTS';
// import turf from '@turf/turf';

class Map extends React.Component {
    constructor(props) {
        super(props);

        //this.displayProjects = this.displayProjects.bind(this);
        this.showProjects = this.showProjects.bind(this);
        this.isolateProject = this.isolateProject.bind(this);
        this.allLayers = [];
        this.isolationLayers = [];
        this.projectsDiff = [];
        this.initMouseMove = this.initMouseMove.bind(this);
        this.initMapZoom = this.initMapZoom.bind(this);
        this.layerGroups = {};
        this.labelGroups = {};
        this.idGroups = {};
        this.lineGroups = {};
        this.connections = [];
        this.projectConnections = [];
        this.initializeLayers = this.initializeLayers.bind(this);
        this.initializeGroups = this.initializeGroups.bind(this);
        this.showConnections = this.showConnections.bind(this);
        this.clearConnections = this.clearConnections.bind(this);
        this.updateMapData = this.updateMapData.bind(this);
        this.toggleLabels = this.toggleLabels.bind(this);
        this.getVisibleCategories = this.getVisibleCategories.bind(this);
        this.circleRad = 12;
        this.circleColor = COLORS.PRIMARY_COLOR;
        this.circleColorSecondary = COLORS.SECONDARY_COLOR;
        this.groups = {};
        this.categoryColors = {};
        this.hoverableLayers = [];

        this.mouseState = {
            isDragging: false,
            mouseDown: false
        };

        // XXX: DEV PURPOSES ONLY
        window.m = this;
    }
    componentDidMount() {
        console.log('map mounted');
        const { containerId, map, dispatch } = this.props;
        this.elt = ReactDOM.findDOMNode(); //eslint-disable-line
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        this.visibleLayers = [];

        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9',
            center: map.center,
            zoom: map.zoom,
            pitch: map.pitch
            //maxBounds: bounds
        });

        this.mapLoaded = false;
        this.map.on('load', () => {
            dispatch(actions.stopLoading());
            this.mapLoaded = true;
            this.updateMapData();
            //if (this.props.currentCategory === '') {
                //return;
            //}
        });
        // XXX: For dev purposes ONLY!
        window.map = this.map;

        // initialize Mouse Move fn
        this.initMapZoom();
    }

    componentDidUpdate(prevProps) {
        const {
            categories,
            projects,
            mapDisplay,
            dataIsLoading,
            selectedProject
        } = this.props;

        // If the map hasn't loaded yet, do nothing
        // if (!this.mapLoaded) {
        //     return;
        // }

        // Did selectedProject change?
        if (!_.isEqual(prevProps.selectedProject, selectedProject)) {
            // Make sure it exists
            if (typeof selectedProject !== 'undefined') {
                // If it's set to an empty string, go back to previous state
                // TODO: Clean this up: handle two cases separately
                this.clearConnections();
                this.isolateProject(selectedProject);

                if (selectedProject !== '') {
                    // dispatch(actions.moveToProject(selectedProject));
                    this.moveToProject(selectedProject);
                }
            }
        }

        if (!_.isEqual(prevProps.dataIsLoading, dataIsLoading) && dataIsLoading === false) {
            this.updateMapData();
        }

        // If the map display settings (i.e. labels or connections)
        // have changed, toggle those things
        if (!_.isEqual(prevProps.mapDisplay, mapDisplay)) {
            if (prevProps.mapDisplay.labels !== mapDisplay.labels) {
                this.toggleLabels();
            }
            if (prevProps.mapDisplay.connections !== mapDisplay.connections) {
                // this.toggleLines();
            }
        }

        if (!_.isEqual(prevProps.projects, projects)) {
            console.log('projects changed');
        }

        // If the projects change...initialize them

        // The map center has changed
        //if (!_.isEqual(prevProps.map.center, map.center)) {
            //// Map center has changed
            //this.setMapPosition();
        //}

        // The map has moved, so set map bounds
        //if (!_.isEqual(prevProps.map.bounds, map.bounds)) {
            //this.setMapBounds();
        //}

        // Categories have changed, so update what's shown
        if (!_.isEqual(prevProps.categories, categories)) {
            this.showProjects(prevProps);
        }

        // TODO: What is this?
        // if the project is selected from the list - it becomes 'active',
        // thus zooming the map to that location, the the active project
        // changes, zoom to the new one
        // TODO: Fix issue where if you click the same project twice,
        // it won't take you back the second time
        // Maybe have projectListActive be set to zero when the map is panned
        // or zoomed
        // if (prevProps.projectListActive !== projectListActive) {
        //
        // }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(actions.setSelectedProject(''));
        dispatch(actions.hideAllCategories());
    }

    setMapPosition() {
        const { map } = this.props;
        this.map.flyTo({
            center: map.center,
            zoom: map.zoom,
            pitch: map.pitch || 0,
            bearing: map.bearing || 0
        });
    }
    setMapBounds() {
        const { map } = this.props;
        this.map.fitBounds(map.bounds);
    }

    getVisibleCategories() {
        const { categories } = this.props;
        return Object.keys(categories).filter(key => categories[key].visible);
    }

    moveToProject(projectId) {
        const { projects, map } = this.props;
        const prj = projects[projectId];
        let loc;
        if (prj.pointType === 'points') {
            const locations = prj.locations;

            loc = [locations[0].lon, locations[0].lat];
        } else {
            loc = [prj.longitude, prj.latitude - 0.110];
        }
        this.map.flyTo({
            center: loc,
            zoom: 8,
            pitch: map.pitch || 0,
            bearing: map.bearing || 0
        });
    }

    /**
     * Hide connecting lines
     * TODO: Test out an ever increasing number of layers added
     * to map to make sure it doesn't cause memory issues
     *
     * Otherwise we can just clear every layer each time, so they are
     * taken out of memory, but it may be slower to draw the same
     * line again in the future
    */
    clearConnections() {
        // hide connection lines
        this.connections.forEach(conName => {
            // if (this.map.getSource(conName)) {
            //     this.map.removeSource(conName);
            // }
            if (this.map.getLayer(conName)) {
                this.map.setLayoutProperty(conName, 'visibility', 'none');
                // this.map.setLayoutProperty(conName, 'visibility', 'none');
            }
        });

        this.connections = [];
    }

    /**
     * Show all the connections for a specific project
     * Creates layers and sources if need be,
     * and shows appropriate layers
    */
    showConnections() {
        const { selectedProject, projects, categories } = this.props;
        const currentProject = projects[selectedProject];
        let connections = [];
        if (currentProject.connections !== '') {
            connections = currentProject.connections.split(',');
        }
        connections.forEach(con => {
            const destinationPrj = projects[con];

            let origin = [currentProject.longitude, currentProject.latitude];
            let destination = [destinationPrj.longitude, destinationPrj.latitude];

            if (currentProject.pointType === 'points') {
                const loc = currentProject.locations;
                origin = [loc[0].lon, loc[0].lat];
            }

            if (destinationPrj.pointType === 'points') {
                const loc = destinationPrj.locations;
                destination = [loc[0].lon, loc[0].lat];
            }

            const line = {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        origin,
                        destination
                    ]
                },
                properties: {
                    prjId: destinationPrj.id
                }
            };

            const conName = currentProject.id + destinationPrj.id;

            // If the connection doesn't yet exist on the map, create it
            if (!this.map.getSource(conName)) {
                this.map.addSource(conName, {
                    type: 'geojson',
                    data: line
                });
            }

            // If the layer doesn't yet exist, then create it
            if (!this.map.getLayer(conName)) {
                this.map.addLayer({
                    id: conName,
                    source: conName,
                    type: 'line',
                    paint: {
                        'line-width': 1,
                        'line-color': categories[destinationPrj.category].color
                    },
                    layout: {
                        visibility: 'visible'
                    }
                }, currentProject.id);
                // this.map.addLayer({
                //     id: `${conName}-number`,
                //     type: 'symbol',
                //     interactive: true,
                //     source: conName,
                //     layout: {
                //         visibility: 'none',
                //         'text-field': '{prjId}',
                //         'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                //         'text-size': 12
                //     },
                //     paint: {
                //         'text-color': '#ffffff'
                //     }
                // });
            } else {
                this.map.setLayoutProperty(conName, 'visibility', 'visible');
                // this.map.setLayoutProperty(`${conName}-number`, 'visibility', 'visible');
            }
            this.connections.push(conName);
        });

        console.log('connections length', this.connections.length);
    }

    /**
     * Called once when the map first initializes
     * Creates sources and layers for every single project and sets their
     * visibility to hidden
     *
     * Needs to be able to be called at any point,
     * so capture all reference to all layers to clear them
     * out and start over if the need arises
    */
    initializeLayers() {
        const { projects, categories } = this.props;

        // Clear all layers out of the map
        this.allLayers.forEach(id => {
            if (this.map.getLayer(id)) {
                this.map.removeLayer(id);
            }
            if (this.map.getLayer(`${id}-text`)) {
                this.map.removeLayer(`${id}-text`);
            }
            if (this.map.getLayer(`${id}-number`)) {
                this.map.removeLayer(`${id}-number`);
            }
            if (this.map.getSource(id)) {
                this.map.removeSource(id);
            }
        });
        this.allLayers = [];

        Object.keys(this.layerGroups).forEach(key => {
            const group = this.layerGroups[key];

            // For each group of projects...
            group.forEach(featureId => {
                if (projects[featureId]) {
                    const project = projects[featureId];
                    // const category = project.category;
                    const id = project.id;

                    this.allLayers.push(id);
                    switch (project.pointType) {
                        case 'point':
                            this.map.addSource(id, {
                                type: 'geojson',
                                data: {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [project.longitude, project.latitude]
                                    },
                                    properties: {
                                        title: project.name,
                                        prjId: project.id
                                    }
                                }
                            });
                            this.map.addLayer({
                                id,
                                type: 'circle',
                                interactive: true,
                                source: id,
                                paint: {
                                    'circle-radius': this.circleRad,
                                    'circle-color': this.circleColor
                                },
                                layout: {
                                    visibility: 'none'
                                }
                            });
                            this.map.addLayer({
                                id: `${id}-number`,
                                type: 'symbol',
                                interactive: true,
                                source: id,
                                layout: {
                                    visibility: 'none',
                                    'text-field': `${id.split('').slice(3).join('')}`,
                                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                                    'text-size': 12
                                },
                                paint: {
                                    'text-color': '#ffffff'
                                }
                            });
                            this.map.addLayer({
                                id: `${id}-text`,
                                type: 'symbol',
                                interactive: true,
                                source: id,
                                layout: {
                                    visibility: 'none',
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
                            break;
                        case 'points': {
                            const locations = JSON.parse(project.locations);
                            const geojsonSrc = {
                                type: 'geojson',
                                data: {
                                    type: 'FeatureCollection',
                                    features: locations.map(loc => ({
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Point',
                                            coordinates: [loc.lon, loc.lat]
                                        },
                                        properties: {
                                            title: project.name
                                        }
                                    }))
                                }
                            };
                            this.map.addSource(id, geojsonSrc);
                            this.map.addLayer({
                                id,
                                type: 'circle',
                                interactive: true,
                                source: id,
                                paint: {
                                    'circle-radius': this.circleRad,
                                    'circle-color': this.circleColor
                                },
                                layout: {
                                    visibility: 'none'
                                }
                            });
                            this.map.addLayer({
                                id: `${id}-text`,
                                type: 'symbol',
                                interactive: true,
                                source: id,
                                layout: {
                                    visibility: 'none',
                                    'text-field': '{title}',
                                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                                    'text-offset': [1, 0],
                                    'text-anchor': 'left',
                                    'text-size': 24
                                },
                                paint: {
                                    'text-color': 'black'
                                }
                            });
                            this.map.addLayer({
                                id: `${id}-number`,
                                type: 'symbol',
                                interactive: true,
                                source: id,
                                layout: {
                                    visibility: 'none',
                                    'text-field': `${project.id.split('').slice(3).join('')}`,
                                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                                    'text-size': 12
                                },
                                paint: {
                                    'text-color': '#ffffff'
                                }
                            });
                            break;
                        }
                        default:
                            break;
                    }
                }
            });
        });
    }

    // FIXME: Not Currently Using this function at all
    // initializePolylines() {
    //     const { projects } = this.props;
    //     this.connections.forEach(con => {
    //         const p1 = projects[con[0]];
    //         const p2 = projects[con[1]];
    //
    //         let origin = [p1.longitude, p1.latitude];
    //         let destination = [p2.longitude, p2.latitude];
    //
    //         if (p1.pointType === 'points') {
    //             const loc = p1.locations;
    //             origin = [loc[0].lon, loc[0].lat];
    //         }
    //
    //         if (p2.pointType === 'points') {
    //             const loc = p2.locations;
    //             destination = [loc[0].lon, loc[0].lat];
    //         }
    //         const line = {
    //             type: 'FeatureCollection',
    //             features: [{
    //                 type: 'Feature',
    //                 geometry: {
    //                     type: 'LineString',
    //                     coordinates: [
    //                         origin,
    //                         destination
    //                     ]
    //                 }
    //             }]
    //         };
    //
    //         const conName = con[0] + con[1];
    //         this.map.addSource(conName, {
    //             type: 'geojson',
    //             data: line
    //         });
    //
    //         this.map.addLayer({
    //             id: conName,
    //             source: conName,
    //             type: 'line',
    //             paint: {
    //                 'line-width': 0.5,
    //                 'line-color': '#555555'
    //             },
    //             layout: {
    //                 visibility: 'none'
    //             }
    //         });
    //
    //         // Add this line to it's layerGroup
    //         if (this.lineGroups[p1.category]) {
    //             this.lineGroups[p1.category].push(conName);
    //         } else {
    //             this.lineGroups[p1.category] = [conName];
    //         }
    //     });
    // }

    toggleLabels() {
        const { mapDisplay } = this.props;
        const visibleCategories = this.getVisibleCategories();

        // Need an array that has ONLY the -text layers

        visibleCategories.forEach(cat => {
            this.labelGroups[cat].forEach(layer => {
                if (layer.indexOf('-text') !== -1) {
                    if (mapDisplay.labels === false) {
                        this.map.setLayoutProperty(layer, 'visibility', 'none');
                    } else {
                        this.map.setLayoutProperty(layer, 'visibility', 'visible');
                    }
                }
            });
        });
    }

    toggleLines() {
        //console.log('toggle lines');
        const { mapDisplay } = this.props;
        const visibleCategories = this.getVisibleCategories();

        visibleCategories.forEach(cat => {
            this.lineGroups[cat].forEach(layer => {
                if (mapDisplay.connections === false) {
                    this.map.setLayoutProperty(layer, 'visibility', 'none');
                } else {
                    this.map.setLayoutProperty(layer, 'visibility', 'visible');
                }
            });
        });
    }

    initializeGroups() {
        const { projects } = this.props;
        //console.log(projects);
        // this.connections = [];
        this.layerGroups = {};
        this.labelGroups = {};
        this.idGroups = {};
        Object.keys(projects).forEach(key => {
            const project = projects[key];
            const category = project.category;
            const id = project.id;

            if (project.pointType === 'point' || project.pointType === 'points') {
                // For each project, loop through all other projects
                // Object.keys(projects).forEach(k => {
                //     const p2 = projects[k];
                //     // If we're not looking at the same project
                //     if (key !== k) {
                //         // and if they're the same category
                //         if (p2.category === category) {
                //             // and if they have a keyword in common...
                //             let connection = false;
                //             if (project.keywords.length > 0) {
                //                 project.keywords.forEach(keyword => {
                //                     if (p2.keywords.indexOf(keyword) !== -1) {
                //                         connection = true;
                //                     }
                //                 });
                //             }
                //         }
                //     }
                // });

                if (this.layerGroups[category]) {
                    this.layerGroups[category].push(id);
                    this.idGroups[category].push(`${id}-number`);
                    this.labelGroups[category].push(`${id}-text`);
                } else {
                    this.layerGroups[category] = [id];
                    this.idGroups[category] = [`${id}-number`];
                    this.labelGroups[category] = [`${id}-text`];
                }
            }
        });
    }

    updateMapData() {
        console.log('map data updated');
        // const { categories } = this.props;
        // Object.keys(categories).forEach(cat => {
        //     this.categoryColors[cat] = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
        // });
        // Must happen in this order!
        this.initializeGroups();
        this.initializeLayers();
        //this.initializePolylines();
        this.initMouseMove();
        this.initMouseDown();
        this.initMouseUp();
    }

    /**
     * Fires when selectedProject is changed from a project ID to an empty
     * string ('')
    */
    exitIsolation() {
        console.log(this);
    }

    /**
     * Fires when a project is clicked -> i.e. when selectedProject changes
     * to have a string value
    */
    isolateProject(selectedProject) {
        console.log('isolating project');
        const { projects, categories } = this.props;

        // If we have a selected project (i.e. !== '')
        if (selectedProject) {
            // Show label for that project and set it's circle color
            if (this.map.getLayer(selectedProject)) {
                this.map.setLayoutProperty(`${selectedProject}-text`, 'text-size', 14);
                this.map.setLayoutProperty(`${selectedProject}-text`, 'visibility', 'visible');
                this.map.setLayoutProperty(`${selectedProject}-number`, 'visibility', 'visible');
                this.map.setPaintProperty(selectedProject, 'circle-color', this.circleColorSecondary);
            }

            console.log('visible layers', this.visibleLayers);

            // Hide previously visible isolation layers, if they exist
            if (this.isolationLayers.length > 0) {
                this.isolationLayers.forEach(layer => {
                    // Make sure layer exists before trying to access it
                    if (this.map.getLayer(layer)) {
                        this.map.setLayoutProperty(layer, 'visibility', 'none');
                        this.map.setLayoutProperty(`${layer}-text`, 'visibility', 'none');
                        this.map.setLayoutProperty(`${layer}-number`, 'visibility', 'none');
                        this.hoverableLayers.splice(this.hoverableLayers.indexOf(layer), 1);
                    }
                });
                this.isolationLayers = [];
            }

            // Hide all visible layers
            this.visibleLayers.forEach(layer => {
                if (layer !== selectedProject) {
                    this.map.setLayoutProperty(layer, 'visibility', 'none');
                    this.map.setLayoutProperty(`${layer}-number`, 'visibility', 'none');
                }

                // Show this project, though
                this.map.setLayoutProperty(selectedProject, 'visibility', 'visible');
                this.map.setLayoutProperty(`${selectedProject}-text`, 'visibility', 'visible');
                this.map.setLayoutProperty(`${selectedProject}-number`, 'visibility', 'visible');
            });

            // Show connected layers
            this.isolationLayers.push(selectedProject);
            this.hoverableLayers.push(selectedProject);

            // Show all connections
            const prj = projects[selectedProject];
            // Show connecting lines
            this.showConnections();

            if (prj.connections.split(',').length > 0) {
                prj.connections.split(',').forEach(conn => {
                    // Try to get layer - if layer exists, show it
                    if (this.map.getLayer(conn)) {
                        this.map.setLayoutProperty(conn, 'visibility', 'visible');
                        this.map.setLayoutProperty(`${conn}-number`, 'visibility', 'visible');
                        // this.map.setLayoutProperty(`${conn}-text`, 'visibility', 'visible');
                        this.isolationLayers.push(conn);
                        this.hoverableLayers.push(conn);
                    }
                });
            }
        } else {
            // Hide connected layers
            this.isolationLayers.forEach(layer => {
                if (this.map.getLayer(layer)) {
                    this.map.setLayoutProperty(layer, 'visibility', 'none');
                    this.map.setLayoutProperty(`${layer}-text`, 'visibility', 'none');
                    this.map.setLayoutProperty(`${layer}-number`, 'visibility', 'none');
                    this.hoverableLayers.splice(this.hoverableLayers.indexOf(layer), 1);
                }
            });
            this.isolationLayers = [];

            //
            // Bring previously visible layers back
            this.visibleLayers.forEach(layer => {
                if (layer !== selectedProject) {
                    this.map.setLayoutProperty(layer, 'visibility', 'visible');
                    this.map.setLayoutProperty(`${layer}-number`, 'visibility', 'visible');
                    this.map.setPaintProperty(layer, 'circle-radius', this.circleRad);
                    this.map.setPaintProperty(layer, 'circle-color', this.circleColor);
                }
            });
        }
    }

    showProjects(prevProps) {
        const { categories, projects, mapDisplay, selectedProject } = this.props;

        if (selectedProject) {
            return;
        }

        const previousCategories = prevProps.categories;

        const visibleCategories = this.getVisibleCategories();

        const filteredProjects = filterListByProperty(projects, 'category', visibleCategories);
        this.hoverableLayers = filteredProjects.map(prj => prj.id);

        // Projects are to be removed if their category was visible
        // last update, but is now not visible
        const removableCategories = Object.keys(previousCategories).filter(key => {
            if (categories[key].visible === false && previousCategories[key].visible === true) {
                return true;
            }
            return false;
        });

        console.log('show projects');
        this.visibleLayers = [];
        visibleCategories.forEach(cat => {
            const layers = this.layerGroups[cat];
            const labels = this.labelGroups[cat];
            const numbers = this.idGroups[cat];
            const lines = this.lineGroups[cat];
            if (layers && layers.length !== 0) {
                layers.forEach(l => {
                    this.map.setLayoutProperty(l, 'visibility', 'visible');
                    this.map.setPaintProperty(l, 'circle-color', this.circleColor);
                    this.visibleLayers.push(l);
                });
            }
            if (labels && labels.length !== 0) {
                labels.forEach(l => {
                    if (mapDisplay.labels) {
                        this.map.setLayoutProperty(l, 'visibility', 'visible');
                        this.map.setLayoutProperty(l, 'text-size', 11);
                    }
                });
            }
            if (numbers && numbers.length !== 0) {
                numbers.forEach(l => {
                    this.map.setLayoutProperty(l, 'visibility', 'visible');
                });
            }
            if (lines && lines.length !== 0) {
                lines.forEach(l => {
                    if (mapDisplay.connections) {
                        this.map.setLayoutProperty(l, 'visibility', 'visible');
                    }
                });
            }
        });

        removableCategories.forEach(cat => {
            const layers = this.layerGroups[cat];
            const labels = this.labelGroups[cat];
            const numbers = this.idGroups[cat];
            const lines = this.lineGroups[cat];
            if (layers && layers.length !== 0) {
                layers.forEach(l => {
                    this.map.setLayoutProperty(l, 'visibility', 'none');
                });
            }
            if (labels && labels.length !== 0) {
                labels.forEach(l => {
                    this.map.setLayoutProperty(l, 'visibility', 'none');
                });
            }
            if (numbers && numbers.length !== 0) {
                numbers.forEach(l => {
                    this.map.setLayoutProperty(l, 'visibility', 'none');
                });
            }
            if (lines && lines.length !== 0) {
                lines.forEach(l => {
                    this.map.setLayoutProperty(l, 'visibility', 'none');
                });
            }
        });

        console.log(this.visibleLayers);
    }


    initMouseUp() {
        const { dispatch } = this.props;
        this.map.on('mouseup', e => {
            // const { selectedProject } = this.props;
            const features = this.map.queryRenderedFeatures(e.point, { layers: this.hoverableLayers });

            // console.log('is dragging state on mouseup', this.mouseState.isDragging);

            if (features.length) {
                console.log(features);
                const prjId = features[0].layer.id;
                // const prj = projects[prjId];

                // TODO: Show Edit panel
                // TODO: Show connections for the selected project, and change
                // it's layer color
                this.map.setPaintProperty(prjId, 'circle-color', '#654321');
                this.map.setPaintProperty(prjId, 'circle-radius', this.circleRad + 3);
                dispatch(actions.setSelectedProject(prjId));
                // dispatch(actions.moveToProject(prjId));
                dispatch(actions.hidePopup());
            }

            this.mouseState.isDragging = false;
            this.mouseState.isMouseDown = false;
        });
    }

    /**
     * Keep track of mouse state on click
    */
    initMouseDown() {
        this.map.on('mousedown', () => {
            this.mouseState.isMouseDown = true;
        });
    }

    // If the map zooms beyond a threshold value,
    // then show the labels,
    // otherwise hide them
    initMapZoom() {
        const { dispatch } = this.props;
        this.map.on('zoom', () => {
            const { mapDisplay } = this.props;
            const zoom = this.map.getZoom();
            if (zoom >= 12 && mapDisplay.labels === false) {
                dispatch(actions.toggleMapDisplay('labels'));
            } else if (zoom < 12 && mapDisplay.labels === true) {
                dispatch(actions.toggleMapDisplay('labels'));
            }
        });
    }
    // Initialize any mouse events on the map
    // upon initial load.  Unless an event
    // needs to be instantiated with specific
    // data, or requires certain elements to exist,
    // it's safe to do it here
    initMouseMove() {
        // When the mouse moves, check for
        // features, which we'll often just respond
        // to by showing a popup display
        const { dispatch, projects, categories } = this.props;
        this.map.on('mousemove', e => {
            const { popup } = this.props;

            // Set dragging state
            if (this.mouseState.isMouseDown) {
                this.mouseState.isDragging = true;
            }

            // Get features under mouse location (e.point)
            const features = this.map.queryRenderedFeatures(e.point, { layers: this.hoverableLayers });

            // If we've found some features...
            if (features.length) {
                // Grab the first one
                const feature = features[0];
                const layerId = feature.layer.id;

                // does this feature exist in the project list?
                if (projects[layerId]) {
                    // If the previous project is different from the current
                    // project, then show the popup
                    if (popup.currentProject !== layerId) {
                        // If we move directly from one project to another,
                        // resize circle of previous project
                        if (popup.currentProject) {
                            this.map.setPaintProperty(popup.currentProject, 'circle-color', this.circleColor);
                            this.map.setPaintProperty(popup.currentProject, 'circle-radius', this.circleRad);
                        }

                        // Save layerId grabbed from map (i.e. project we're
                        // hoving over), and make it's circle larger
                        this.hoveredProjectId = layerId;
                        dispatch(actions.showPopupWithProject(layerId, e.point));
                        this.map.setPaintProperty(layerId, 'circle-color', '#123456');
                        this.map.setPaintProperty(layerId, 'circle-radius', this.circleRad + 4);
                    }
                }
            } else {
                // If no features were found, only do something if the popup is
                // visible
                if (popup.visible === true) {
                    dispatch(actions.hidePopup());

                    // Reset hovered project to non-hovered state
                    if (this.hoveredProjectId) {
                        this.map.setPaintProperty(this.hoveredProjectId, 'circle-color', this.circleColor);
                        this.map.setPaintProperty(this.hoveredProjectId, 'circle-radius', this.circleRad);
                        this.hoveredProjectId = null;
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className='map' id={this.props.containerId} />
        );
    }
}

Map.propTypes = {
    map: React.PropTypes.object.isRequired,
    popup: React.PropTypes.object.isRequired,
    categories: React.PropTypes.object.isRequired,
    projects: React.PropTypes.object.isRequired,
    mapDisplay: React.PropTypes.object,
    dataIsLoading: React.PropTypes.bool,
    containerId: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
    selectedProject: React.PropTypes.string
};

function mapStateToProps(state) {
    return {
        map: state.map,
        popup: state.popup,
        mapDisplay: state.mapDisplay,
        projectListActive: state.projectListActive,
        dataIsLoading: state.dataIsLoading
    };
}

export default connect(mapStateToProps)(Map);
