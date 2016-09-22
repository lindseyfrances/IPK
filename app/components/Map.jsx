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
import { filterListByProperty } from 'app/api/helpers.js';

class Map extends React.Component {
    constructor(props) {
        super(props);

        //this.displayProjects = this.displayProjects.bind(this);
        this.showProjects = this.showProjects.bind(this);
        this.allLayers = [];
        this.projectsDiff = [];
        this.initMouseMove = this.initMouseMove.bind(this);
        this.initMapZoom = this.initMapZoom.bind(this);
        this.layerGroups = {};
        this.connections = [];
        this.initializeLayers = this.initializeLayers.bind(this);
        this.initializeGroups = this.initializeGroups.bind(this);
        this.initializePolylines = this.initializePolylines.bind(this);
        this.toggleLabels = this.toggleLabels.bind(this);
        this.getVisibleCategories = this.getVisibleCategories.bind(this);
        this.circleRad = 4;
        this.circleColor = '#33cc33';
        this.groups = {};

        // XXX: DEV PURPOSES ONLY
        window.m = this;
    }
    componentDidMount() {
        var { appLocation, containerId, map, categories, dispatch } = this.props;
        this.elt = ReactDOM.findDOMNode();
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        this.visibleLayers = [];

        // Create category colors
        this.categoryColors = {};
        Object.keys(categories).forEach((cat) => {
            this.categoryColors[cat] = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        });

        var bounds = [
            [-74.277191,40.482993],
            [-73.688049,40.925446]
        ];

        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9',
            center: map.center,
            zoom: map.zoom,
            pitch: 30,
            //maxBounds: bounds
        });

        this.mapLoaded = false;
        this.map.on('load', () => {
            dispatch(actions.stopLoading());
            this.mapLoaded = true;
            this.initializeGroups();
            this.initializeLayers();
            this.initializePolylines();
            //if (this.props.currentCategory === '') {
                //return;
            //}
        });
        // XXX: For dev purposes ONLY!
        window.map = this.map;

        // initialize Mouse Move fn
        this.initMouseMove();
        this.initMouseClick();
        this.initMapZoom();
    }

    setMapBounds() {
        var { map } = this.props;
        this.map.fitBounds(map.bounds);
    }

    setMapPosition() {
        var { map } = this.props;
        this.map.flyTo({
            center: map.center,
            zoom: map.zoom,
            pitch: map.pitch || 0,
            bearing: map.bearing || 0
        });
    }

    // Not a great implementation, pretty sloppy
    // O2 complexity, and tons of checks
    initializeGroups() {
        let { projects } = this.props;
        Object.keys(projects).forEach(key => {
            let project = projects[key];
            let category = project.category;
            let id = project.id;

            if (project.pointType === 'point' || project.pointType === 'points') {

                // For each project, loop through all other projects
                Object.keys(projects).forEach(k => {
                    let p2 = projects[k];
                    // If we're not looking at the same project
                    if (key !== k) {
                        // and if they're the same category
                        if (p2.category === category) {
                            // and if they have a keyword in common...
                            let connection = false;
                            if(project.keywords.length > 0) {
                                project.keywords.forEach(keyword => {
                                    if (p2.keywords.indexOf(keyword) !== -1) {
                                        connection = true;
                                    }
                                });
                                // If we've found a connection
                                if (connection) {
                                    this.connections.push([id, p2.id]);
                                }
                            }
                        }
                    }
                });

                if (this.layerGroups[category]) {
                    this.layerGroups[category].push(id);
                    this.layerGroups[category].push(id+'-text');
                } else {
                    this.layerGroups[category] = [id];
                    this.layerGroups[category].push(id+'-text');
                }
            }
        });
    }

    toggleLabels() {
        let { showLabels } = this.props;
        let visibleCategories = this.getVisibleCategories();

        // Need an array that has ONLY the -text layers

        visibleCategories.forEach((cat) => {
            this.layerGroups[cat].forEach((layer) => {
                if (layer.indexOf('-text') !== -1) {
                    if (showLabels === false) {
                        this.map.setLayoutProperty(layer, 'visibility', 'none');
                    } else {
                        this.map.setLayoutProperty(layer, 'visibility', 'visible');
                    }
                }
            });
        });
    }

    initializeLayers() {
        let { projects } = this.props;

        Object.keys(this.layerGroups).forEach(key => {
            let group = this.layerGroups[key];

            // For each group of projects...
            group.forEach(featureId => {
                if (projects[featureId]) {
                    let project = projects[featureId];
                    let category = project.category;
                    let id = project.id;

                    this.allLayers.push(id);
                    switch (project.pointType) {
                        case 'point':
                            this.map.addSource(id, {
                                type: 'geojson',
                                data: {
                                    type:'FeatureCollection',
                                    features: [
                                        {
                                            type: 'Feature',
                                            geometry: {
                                                type: 'Point',
                                                coordinates: [project.longitude, project.latitude]
                                            },
                                            properties: {
                                                title: project.name
                                            }
                                        }
                                    ]
                                }
                            });
                            this.map.addLayer({
                                id: id,
                                type: 'circle',
                                interactive: true,
                                source: id,
                                paint: {
                                    'circle-radius': this.circleRad,
                                    'circle-color': this.categoryColors[project.category]
                                },
                                layout: {
                                    visibility: 'none'
                                }
                            });
                            this.map.addLayer({
                                id: id + '-text',
                                type: 'symbol',
                                interactive: true,
                                source: id,
                                layout: {
                                    visibility: 'none',
                                    "text-field": "{title}",
                                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                                    "text-offset": [1, 0],
                                    "text-anchor": "left"
                                }
                            });
                            break;
                        case 'points':
                            let locations = JSON.parse(project.locations);
                            let geojsonSrc = {
                                type: 'geojson',
                                data: {
                                    type: 'FeatureCollection',
                                    features: locations.map((loc) => {
                                        return {
                                            type: 'Feature',
                                            geometry: {
                                                type: 'Point',
                                                coordinates: [loc.lon, loc.lat]
                                            },
                                            properties: {
                                                title: project.name
                                            }
                                        };
                                    })
                                }
                            };
                            this.map.addSource(id, geojsonSrc);
                            this.map.addLayer({
                                id: id,
                                type: 'circle',
                                interactive: true,
                                source: id,
                                paint: {
                                    'circle-radius': this.circleRad,
                                    'circle-color': this.categoryColors[project.category]
                                },
                                layout: {
                                    visibility: 'none'
                                }
                            });
                            this.map.addLayer({
                                id: id + '-text',
                                type: 'symbol',
                                interactive: true,
                                source: id,
                                layout: {
                                    visibility: 'none',
                                    "text-field": "{title}",
                                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                                    "text-offset": [1, 0],
                                    "text-anchor": "left"
                                }
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        });
    }

    initializePolylines() {
        let { projects } = this.props;
        this.connections.forEach(con => {
            let p1 = projects[con[0]];
            let p2 = projects[con[1]];

            let origin = [p1.longitude, p1.latitude];
            let destination = [p2.longitude, p2.latitude];
            var line = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            origin,
                            destination
                        ]
                    }
                }]
            };

            let conName = con[0] + con[1];
            this.map.addSource(conName, {
                type: 'geojson',
                data: line
            });

            this.map.addLayer({
                id: conName,
                source: conName,
                type: 'line',
                paint: {
                    'line-width': 0.5,
                    'line-color': '#555555'
                },
                layout: {
                    visibility: 'none'
                }
            });

            // Add this line to it's layerGroup
            this.layerGroups[p1.category].push(conName);
        });
    }

    getVisibleCategories() {
        let { categories } = this.props;
        return Object.keys(categories).filter(key => {
            return categories[key];
        });
    }

    showProjects(prevProps) {
        let { categories, projects, showLabels } = this.props;
        let previousCategories = prevProps.categories;

        let visibleCategories = this.getVisibleCategories();
        //Object.keys(categories).filter(key => {
            //return categories[key];
        //});

        let filteredProjects = filterListByProperty(projects, 'category', visibleCategories);
        this.hoverableLayers = filteredProjects.map(prj => {
            return prj.id;
        });

        // Projects are to be removed if their category was visible
        // last update, but is now not visible
        let removableCategories = Object.keys(previousCategories).filter(key => {
            if (categories[key] === false && previousCategories[key] === true) {
                return true;
            } else {
                return false;
            }
        });

        this.visibleLayers = [];
        visibleCategories.forEach(cat => {
            let layers = this.layerGroups[cat];
            layers.forEach(l => {
                if (showLabels) {
                    this.map.setLayoutProperty(l, 'visibility', 'visible');
                } else {
                    if (l.indexOf('-text') === -1) {
                        this.map.setLayoutProperty(l, 'visibility', 'visible');
                    }
                }
            });
        });

        removableCategories.forEach(cat => {
            let layers = this.layerGroups[cat];
            layers.forEach(l => {
                this.map.setLayoutProperty(l, 'visibility', 'none');
            });
        });
    }

    componentDidUpdate(prevProps) {
        var { categories, projects, map, showLabels } = this.props;

        if (prevProps.showLabels !== showLabels) {
            this.toggleLabels();
        }
        // If the map hasn't loaded yet, do nothing
        if (!this.mapLoaded) {
            return;
        }

        if (!_.isEqual(prevProps.map.center, map.center)) {
            // Map center has changed
            this.setMapPosition();
        }
        if (!_.isEqual(prevProps.map.bounds, map.bounds)) {
            this.setMapBounds();
        }

        if (!_.isEqual(prevProps.categories, categories)) {
            this.showProjects(prevProps);
        }
    }

    render() {
        return (
            <div id='map'></div>
        );
    }

    initMouseClick() {
        var { dispatch } = this.props;
        this.map.on('mousedown', (e) => {
            var features = this.map.queryRenderedFeatures(e.point, { layers: this.hoverableLayers});
            if (features.length > 0) {
                var prjId = features[0].layer.id;
                dispatch(actions.setSelectedProject(prjId));
                //dispatch(actions.hidePopup());
            }
        });
    }

    initMapZoom() {
        this.map.on('zoom', (e) => {
            console.log(this.map.getZoom());
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
        // to by showing a popup display,
        // but the possibilities are quite endless
        var { dispatch, projects } = this.props;
        this.map.on('mousemove', (e) => {
            var { popup } = this.props;
            //var { layers } = this.props;

            // Get features under mouse location (e.point)
            var features = this.map.queryRenderedFeatures(e.point, { layers: this.hoverableLayers});

            // If we've found some features...
            if (features.length) {
                // Grab the first one
                var feature = features[0];
                let layerId = feature.layer.id;

                // does this feature exist in the project list?
                if (projects[layerId]) {
                    // If the previous project is different from the current
                    // project, then show the popup
                    if (popup.currentProject !== layerId) {

                        // If we move directly from one project to another,
                        // resize circle of previous project
                        if (popup.currentProject) {
                            this.map.setPaintProperty(popup.currentProject, 'circle-color', this.categoryColors[projects[popup.currentProject].category]);
                            this.map.setPaintProperty(popup.currentProject, 'circle-radius', this.circleRad);
                        }

                        // Save layerId grabbed from map (i.e. project we're
                        // hoving over), and make it's circle larger
                        this.hoveredProjectId = layerId;
                        dispatch(actions.showPopupWithProject(layerId, e.point));
                        this.map.setPaintProperty(layerId, 'circle-color', '#000000');
                        this.map.setPaintProperty(layerId, 'circle-radius', this.circleRad + 10);
                    }
                }
            } else {
                // If no features were found, only do something if the popup is
                // visible
                if (popup.visible === true) {
                    dispatch(actions.hidePopup());
                    if (this.hoveredProjectId) {
                        this.map.setPaintProperty(this.hoveredProjectId, 'circle-color', this.categoryColors[projects[this.hoveredProjectId].category]);
                        this.map.setPaintProperty(this.hoveredProjectId, 'circle-radius', this.circleRad);
                        this.hoveredProjectId = null;
                    }
                }
            }
        });
    }

}

function mapStateToProps(state) {
    return {
        map: state.map,
        popup: state.popup,
        categories: state.categories,
        //appLocation: state.appLocation,
        //visibleLayers: state.visibleLayers,
        //allData: state.allData,
        projects: state.projects,
        showLabels: state.showLabels
        //currentCategory: state.currentCategory,
        //hoveredProject: state.hoveredProject,

    };
}

export default connect(mapStateToProps)(Map);

// See - http://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}
// See - http://stackoverflow.com/questions/30834946/trying-to-solve-symmetric-difference-using-javascript
function symDiff() {
    var sets = [], result = [], LocalSet;
    if (typeof Set === "function") {
        try {
            // test to see if constructor supports iterable arg
            var temp = new Set([1,2,3]);
            if (temp.size === 3) {
                LocalSet = Set;
            }
        } catch(e) {}
    }
    if (!LocalSet) {
        // use teeny polyfill for Set
        LocalSet = function(arr) {
            this.has = function(item) {
                return arr.indexOf(item) !== -1;
            };
        };
    }
    // make copy of arguments into an array
    var args = Array.prototype.slice.call(arguments, 0);
    // put each array into a set for easy lookup
    args.forEach(function(arr) {
        sets.push(new LocalSet(arr));
    });
    // now see which elements in each array are unique 
    // e.g. not contained in the other sets
    args.forEach(function(array, arrayIndex) {
        // iterate each item in the array
        array.forEach(function(item) {
            var found = false;
            // iterate each set (use a plain for loop so it's easier to break)
            for (var setIndex = 0; setIndex < sets.length; setIndex++) {
                // skip the set from our own array
                if (setIndex !== arrayIndex) {
                    if (sets[setIndex].has(item)) {
                        // if the set has this item
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                result.push(item);
            }
        });
    });
    return result;
}
