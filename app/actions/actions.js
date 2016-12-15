import axios from 'axios';
import d3 from 'd3';

export const startLoading = () => {
    return {
        type: 'START_LOADING'
    };
};

export const stopLoading = () => {
    return {
        type: 'STOP_LOADING'
    };
};

export const setMapCenter = (center) => {
    return {
        type: 'SET_MAP_CENTER',
        center
    };
};
export const setMapBounds = (bounds) => {
    return {
        type: 'SET_MAP_BOUNDS',
        bounds
    };
};

// Public function
// finds project with associated ID, gets position
// then dispatches actions to the store
export const setMapCenterOnProject = (id) => {
    return (dispatch, getState) => {
        const project = getState().projects[id];
        switch (project.pointType) {
            case 'points': {
                const locations = JSON.parse(project.locations);

                const geojsonSrc = {
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

                const bounds = d3.geo.bounds(geojsonSrc.data);
                dispatch(setMapBounds(bounds));
                break;
            }
            case 'point': {
                const center = [project.longitude, project.latitude];
                dispatch(setMapCenter(center));
                break;
            }
            default:
                break;
        }
    };
};

export const dataIsLoading = (isLoading) => {
    return {
        type: 'LOADING_DATA',
        isLoading
    };
};
export const initializeProjectList = (projects) => {
    return {
        type: 'INITIALIZE_PROJECT_LIST',
        projects
    };
};


export const initializeCategories = (projects) => {
    return (dispatch) => {
        const cats = [];
        projects.forEach((prj) => {
            if (cats.indexOf(prj.category) === -1) {
                cats.push(prj.category);
                dispatch(addCategory(prj.category));
            }
        });
    };
};
const addCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        category
    };
};
// Moving away from getting data from amazon s3
// and moving towards having all data in a csv
// which could easily be moved to a database in the
// future
export const initializeProjectListFromDB = () => {
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        axios.get('/api/mapitems').then((response) => {
            dispatch(initializeProjectList(response.data));
            dispatch(initializeCategories(response.data));
            dispatch(dataIsLoading(false));
        });
    };
};

export const toggleCategory = (category) => {
    return {
        type: 'TOGGLE_CATEGORY',
        category
    };
};


export const setCurrentCategory = (cat) => {
    return {
        type: 'SET_CURRENT_CATEGORY',
        cat
    };
};

export const setHoverProject = (id) => {
    return {
        type: 'SET_HOVERED_PROJECT',
        id
    };
};

export const removeHoverProject = () => {
    return {
        type: 'REMOVE_HOVERED_PROJECT'
    };
};

export const showPopupWithProject = (id, point) => {
    return {
        type: 'SHOW_POPUP_WITH_PROJECT',
        id,
        point
    };
};

export const hidePopup = () => {
    return {
        type: 'HIDE_POPUP'
    };
};

export const setSelectedProject = (id) => {
    return {
        type: 'SET_SELECTED_PROJECT',
        id
    };
};

export const clearSelectedProject = () => {
    return {
        type: 'CLEAR_SELECTED_PROJECT'
    };
};

export const toggleMapLabels = () => {
    return {
        type: 'TOGGLE_MAP_LABELS'
    };
};

export const toggleMapLines = () => {
    return {
        type: 'TOGGLE_MAP_LINES'
    };
};

export const moveToProject = (id) => {
    return {
        type: 'MOVE_TO_PROJECT',
        id
    };
};

export const toggleMapDisplay = (labelName) => {
    return {
        type: 'TOGGLE_MAP_DISPLAY',
        labelName
    };
};

export const toggleMenu = () => {
    return {
        type: 'TOGGLE_MENU'
    };
};

export const toggleImpact = () => {
    return {
        type: 'TOGGLE_IMPACT'
    };
};

export const closeImpact = () => {
    return {
        type: 'CLOSE_IMPACT'
    };
};

export const startAddItem = (data) => {
    return (dispatch) => {
        dispatch(startLoading());
        axios.post('api/mapitem', data)
            .then((response) => {
                console.log(response.data);
                dispatch(stopLoading());
            });
    };
};

// TODO: Implement this!!!!
export const startUpdateProject = (id, updates) => {
    return (dispatch) => {
        console.log(updates);
        axios.post(`api/mapitem/${id}/update`, updates)
            .then((response) => {
                console.log(response);
                dispatch(updateProject(id, updates));
                dispatch(stopLoading());
            });
    };
};

export const updateProject = (id, updates) => {
    return {
        type: 'UPDATE_PROJECT',
        id,
        updates
    };
};
