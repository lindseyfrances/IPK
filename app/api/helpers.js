var topojson = require('topojson');

export const topoToGeojson = (data) => {
    var key = Object.keys(data.objects)[0];
    return topojson.feature(data, data.objects[key]);
};

export const filterProjectsByCategory = function (projects, category) {
    let filteredProjects = [];
    Object.keys(projects).forEach((prj) => {
        if (projects[prj].category === category) {
            filteredProjects.push(projects[prj]);
        }
    });

    return filteredProjects;
};
