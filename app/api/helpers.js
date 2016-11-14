/* eslint
    "prefer-rest-params": "off",
    "prefer-spread": "off"
 */
const topojson = require('topojson');

/**
 * Helper function to convert topojson to geojson
 * @param {object} data - raw topojson data
 * @return {object}
 */
export const topoToGeojson = (data) => {
    const key = Object.keys(data.objects)[0];
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
        const filteredLists = filter.map((f) => {
            return Object.keys(initialList).map((key) => {
                return initialList[key][filterProperty] === f ? initialList[key] : null;
            })
            .filter((prj) => {
                return prj;
            });
        });
        return [].concat.apply([], filteredLists);
    }

    return [];
};

/**
 * Generates a random hex string
 * Pretty unsophisticated, and it' will return
 * completely random colors, no scheme to speak of
 * @return {string} hex color
 */
export const randomColor = function() {
    return `#${Math.floor(Math.random() * 16).toString(16)}
            ${Math.floor(Math.random() * 16).toString(16)}
            ${Math.floor(Math.random() * 16).toString(16)}
            ${Math.floor(Math.random() * 16).toString(16)}
            ${Math.floor(Math.random() * 16).toString(16)}
            ${Math.floor(Math.random() * 16).toString(16)}`;
};

// See - http://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
export const arraysEqual = function(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
};
// See - http://stackoverflow.com/questions/30834946/trying-to-solve-symmetric-difference-using-javascript
export const symDiff = function() {
    const sets = [],
        result = [];
    let LocalSet;
    if (typeof Set === 'function') {
        try {
            // test to see if constructor supports iterable arg
            const temp = new Set([1, 2, 3]);
            if (temp.size === 3) {
                LocalSet = Set;
            }
        } catch (e) {
            console.warn(e);
        }
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
    const args = Array.prototype.slice.call(arguments, 0);
    // put each array into a set for easy lookup
    args.forEach((arr) => {
        sets.push(new LocalSet(arr));
    });
    // now see which elements in each array are unique
    // e.g. not contained in the other sets
    args.forEach((array, arrayIndex) => {
        // iterate each item in the array
        array.forEach((item) => {
            let found = false;
            // iterate each set (use a plain for loop so it's easier to break)
            for (let setIndex = 0; setIndex < sets.length; setIndex++) {
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
};

