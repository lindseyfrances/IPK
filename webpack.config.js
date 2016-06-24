var webpack = require('webpack');
var path = require('path');
var loaders = require('./config/loaders');
var plugins = require('./config/plugins');

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
    output: { 
        path: path.join(process.env.PWD, 'dist'),
        filename: 'bundle.js'
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
