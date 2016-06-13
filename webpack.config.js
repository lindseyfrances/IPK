var webpack = require('webpack')
var path = require('path')
var loaders = require('./config/loaders');
var plugins = require('./config/plugins');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(plugins);

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? null : 'cheap-eval-source-map',
    entry: process.env.NODE_ENV === 'production' ? 
        './app/app.js' : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './app/app.js'
    ],
    output: { 
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
        //publicPath: 'dist/'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'webworkify': 'webworkify-webpack'
        }
    },
    module: loaders,
    plugins: plugins,
    devServer: process.env.NODE_ENV === 'production' ? null : {
        contentBase: './dist',
        hot: true
    }
};
