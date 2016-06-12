var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var loaders = require('./config/loaders');
 
module.exports = {
    devtool: 'source-map',
    entry: './app/app.js',
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
        //publicPath: 'dist/'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            webworkify: 'webworkify-webpack'
        }
    },
    module: loaders,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
    ]
};
