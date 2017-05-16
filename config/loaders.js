const path = require('path');
//var p = path.resolve('node_modules/mapbox-gl/js/render/shaders.js');
//console.log(p);

module.exports = {
    loaders: [
        {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015', 'stage-2']
            }
        },
        // {
        //     test: /\.js?$/,
        //     exclude: /(node_modules|bower_components)/,
        //     loader: 'eslint-loader'
        // },
        // {
        //     test: /\.jsx?$/,
        //     exclude: /(node_modules|bower_components)/,
        //     loader: 'eslint-loader'
        // },
        {
            test: /\.scss/,
            loader: 'style-loader!css-loader!postcss-loader!sass'
        },
        {
            test: /\.css/,
            loader: 'style-loader!css-loader!postcss-loader'
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

            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        },
        {
            test: /\.(otf|eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
        //{
            //test: /aws-sdk/,
            //loaders: [
                //'transform?aws-sdk/dist-tools/transform'
            //]
        //},
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
};
