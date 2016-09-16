var topojson = require('topojson');

/**
 * Helper function to convert topojson to geojson
 * @param {object} data - raw topojson data
 * @return {object} 
 */
export const topoToGeojson = (data) => {
    var key = Object.keys(data.objects)[0];
    return topojson.feature(data, data.objects[key]);
};

/**
 * Filter object items based on the value of a provided property\n
 * i.e. an item is only kept if it's item[filterProperty] === filter.
 * @param {array} initialList - Object containing all items
 * @param {string} filterProperty - name of property that has it's value
 * checked
 * @param {*|[*]} filter - values to compare item[filteredProperty]
 * against
 * @return {array}
 */
export const filterListByProperty = function (initialList, filterProperty, filter) {
    //let filteredList = [];
    if (typeof filter === 'string') {
        return Object.keys(initialList).map((key) => {
            return initialList[key][filterProperty] === filter ? initialList[key] : null;
        })
        .filter((prj) => {
            return prj;
        });
    } else if (typeof filter === 'object' && filter.length) {
        // for each filter in the list, add all it's associated projects to
        // filteredList
        let filteredLists = filter.map(f => {
            return Object.keys(initialList).map(key => {
                return initialList[key][filterProperty] === f ? initialList[key] : null;
            })
            .filter(prj => {
                return prj;
            });
        });
        return [].concat.apply([], filteredLists);
    }

    return [];
};
