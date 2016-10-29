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
var precss = require('precss');
var autoprefixer = require('autoprefixer');

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
    postcss: function() {
        return [require('autoprefixer'), require('precss')];
    },
    plugins: plugins,
    //devServer: {
        //proxy: {
            //'/**': {  //catch all requests
                //target: '/index.html',  //default target
                //secure: false,
                //bypass: function(req, res, opt){
                    ////your custom code to check for any exceptions
                    ////console.log('bypass check', {req: req, res:res, opt: opt});
                    //if(req.path.indexOf('/api') !== -1){
                        //res.send('hi');
                        //return '/';
                    //}

                    //if (req.headers.accept.indexOf('html') !== -1) {
                        //return '/index.html';
                    //}
                //}
            //}
        //}
    //}
    devServer: process.env.NODE_ENV === 'production' ? null : {
        contentBase: './dist',
        hot: true,
        proxy: [ {
            path: '/api/*',
            target: 'http://localhost:3000'
        }]
    }
};
