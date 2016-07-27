/*
 *  Notes:
 *      To get AWS to work with Webpack see 'chrisradek commented on Apr 20'
 *      at this link - https://github.com/aws/aws-sdk-js/issues/603
 *
 *      Mapbox GL also struggles to work with Webpack and require
 *      a few special loaders
 *
 */

var webpack = require('webpack');
var path = require('path');
var loaders = require('./config/loaders');
var plugins = require('./config/plugins');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PWD = process.cwd();


module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? null : 'cheap-eval-source-map',
    entry: process.env.NODE_ENV === 'production' ? 
        './app/app.jsx' : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './app/app.jsx'
    ],
    node: {
        fs: 'empty'
    },
    output: { 
        path: path.join(process.env.PWD, 'dist'),
        filename: 'bundle.js',
        //publicPath: 'dist/'
    },
    resolve: {
        root: __dirname,
        alias: {
            'webworkify': 'webworkify-webpack',
            app: 'app',
        },
        extensions: ['', '.js', '.jsx']
    },
    module: loaders,
    plugins: plugins,
    devServer: process.env.NODE_ENV === 'production' ? null : {
        contentBase: './dist',
        hot: true
    }
};
