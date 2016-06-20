var topojson = require('topojson');

export const topoToGeojson = (data) => {
    var key = Object.keys(data.objects)[0];
    return topojson.feature(data, data.objects[key]);
};
