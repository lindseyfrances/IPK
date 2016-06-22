import axios from 'axios';
import contentPageLocations from './../api/contentPageLocations';

export default class PageController {
    constructor() {
        this.water;
        this.soil;
    }

    waterConstructor() {
        console.log(contentPageLocations);
        if (!this.water) {
            var dataUrls = ['https://s3.amazonaws.com/no-free-lunch-data/WBDHU8.json','https://s3.amazonaws.com/no-free-lunch-data/NYC_RESERVOIR_LOCATIONS.json', 'https://s3.amazonaws.com/no-free-lunch-data/WATER_QUALITY_COMPLAINTS.json'];

            var data = {};
            var dataNames = [];
            var numComplete = 0;

            var generatePages = (results) => {
                var retVal = {
                    sources: {},
                    layers: {}
                };
                var names = results.forEach((result) => {
                    var name = Object.keys(result.objects)[0];
                    retVal.sources[name] = {
                        id: name,
                        type: result.objects[name].geometries[0].type,
                        data: result
                    };
                    retVal.layers[name] = {
                        id: name,
                        associatedLayer: 'water',
                        visibleOnPage: contentPageLocations[name]
                    };
                });
                return retVal;
            };
            var promises = dataUrls.map(url => axios.get(url).then(res => res.data));
            var that = this;
            return Promise.all(promises).then(results => {
                // do something with results.
                that.water = generatePages(results);
                return that.water;
            });

        }
    }
}
