var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var loaders = require('./config/loaders');

console.log(loaders);
module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './app/app.js',
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};
