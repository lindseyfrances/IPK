var path = require('path');
//var p = path.resolve('node_modules/mapbox-gl/js/render/shaders.js');
//console.log(p);

module.exports = {
    loaders: [
        {
            test: /\.js?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.scss/,
            loader: 'style!css!sass'
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.csv$/,
            loader: 'dsv-loader'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/mapbox-gl/js/render/painter/use_program.js'),
            loader: 'transform/cacheable?brfs'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/mapbox-gl/js/render/shaders.js'),
            loader: 'transform/cacheable?brfs'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/webworkify/index.js'),
            loader: 'worker'
        }
    ],
    postLoaders: [{
        include: /node_modules\/mapbox-gl-shaders/,
        loader: 'transform',
        query: 'brfs'
    }]
} 
