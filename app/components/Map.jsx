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
import { filterProjectsByCategory } from 'app/api/helpers.js';

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.displayProjects = this.displayProjects.bind(this);
    }
    componentDidMount() {
        var { appLocation, containerId, map, dispatch } = this.props;
        this.elt = ReactDOM.findDOMNode();
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        this.visibleProjects = [];

        var bounds = [
            [-74.277191,40.482993],
            [-73.688049,40.925446]
        ];

        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/outdoors-v9',
            center: map.center,
            zoom: map.zoom,
            pitch: 30,
            //maxBounds: bounds
        });

        this.mapLoaded = false;
        this.map.on('load', () => {
            this.mapLoaded = true;
            if (this.props.currentCategory === '') {
                return;
            }
            let filteredProjects = filterProjectsByCategory(this.props.projects, this.props.currentCategory);
            console.log('map did load with projects', filteredProjects);
            this.displayProjects(filteredProjects);
        });
        // TODO: FOr dev purposes ONLY!
        window.map = this.map;

        // initialize Mouse Move fn
        this.initMouseMove();

    }

    initMap() {
        console.log('map loaded');
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

    displayProjects(filteredProjects) {
        // For each project, add a layer
        // and capture a reference to it on
        // the component (so the layer can be 
        // identified and removed later)
        filteredProjects.forEach((project) => {
            this.visibleProjects.push(project.id);
            switch (project.pointType) {
                case 'point':
                    this.map.addSource(project.id, {
                        type: 'geojson',
                        data: {
                            type:'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [project.longitude, project.latitude]
                                    }
                                }
                            ]
                        }
                    });
                    this.map.addLayer({
                        id: project.id,
                        type: 'circle',
                        interactive: true,
                        source: project.id,
                        paint: {
                            'circle-radius': 5,
                            'circle-color': '#000000'
                        }
                    });
                    break;
                case 'points':
                    let locations = JSON.parse(project.locations);
                    console.log(project.id, locations);
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
                                    }
                                };
                            })
                        }
                    };
                    this.map.addSource(project.id, geojsonSrc);
                    this.map.addLayer({
                        id: project.id,
                        type: 'circle',
                        interactive: true,
                        source: project.id,
                        paint: {
                            'circle-radius': 5,
                            'circle-color': '#000000'
                        }
                    });
                    break;
            }
        });
    }

    componentDidUpdate(prevProps) {
        var { shouldShow, projects, currentCategory, hoveredProject } = this.props;

        // If the map hasn't loaded yet, do nothing
        if (!this.mapLoaded) {
            return;
        }

        // If the map is hidden, then don't do anything
        if (!shouldShow) {
            return;
        }

        if (currentCategory !== prevProps.currentCategory) {
            console.log('current category changed');
            this.visibleProjects.forEach((src) => {
                if (this.map.getLayer(src)) {
                    this.map.removeLayer(src);
                }
                if (this.map.getSource(src)) {
                    this.map.removeSource(src);
                }
            });

            // If the map is visible, get the projects
            // corresponding to the current category
            var filteredProjects = filterProjectsByCategory(projects, currentCategory);

            console.log('map did update with projects', filteredProjects);
            this.displayProjects(filteredProjects);

        }

        // Check if any projects are hovered over
        if (hoveredProject !== prevProps.hoveredProject) {
            if (prevProps.hoveredProject !== '') {
                this.map.setPaintProperty(prevProps.hoveredProject, 'circle-color', '#000000');
                this.map.setPaintProperty(prevProps.hoveredProject, 'circle-radius', 5);
            } 
            if (hoveredProject) {
                this.map.setPaintProperty(hoveredProject, 'circle-color', '#551A8B');
                this.map.setPaintProperty(hoveredProject, 'circle-radius', 15);
            }

        }
    }

    render() {
        var { shouldShow } = this.props;
        return (
            <div style={{visibility: shouldShow ? 'visible' : 'hidden'}} id='map'></div>
        );
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
        var { dispatch, projects, popup } = this.props;
        this.map.on('mousemove', (e) => {
            //var { layers } = this.props;

            // Get features under mouse location (e.point)
            var features = this.map.queryRenderedFeatures(e.point, { layers: this.visibleProjects });

            // If we've found some features...
            if (features.length) {
                // Grab the first one
                var feature = features[0];

                // does this feature exist in the project list?
                if (projects[feature.layer.id]) {

                    dispatch(actions.showPopupWithProject(feature.layer.id, e.point));
                    dispatch(actions.setHoverProject(feature.layer.id));
                }
            } else {
                dispatch(actions.hidePopup());
                dispatch(actions.removeHoverProject());
            }
        });
    }

}

function mapStateToProps(state) {
    return {
        map:state.map,
        popup: state.popup,
        appLocation: state.appLocation,
        visibleLayers: state.visibleLayers,
        allData: state.allData,
        projects: state.projects,
        currentCategory: state.currentCategory,
        hoveredProject: state.hoveredProject
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
