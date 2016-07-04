var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PWD = process.cwd();

console.log(process.env.NODE_ENV);

try {
    envFile(path.join(process.env.PWD, 'config/' + process.env.NODE_ENV + '.env'));
} catch(e) {
    console.log(e);
}

var configure = () => {
    var dev = [
        new webpack.HotModuleReplacementPlugin()
    ];

    var shared = [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                MAPBOXGL_ACCESS_TOKEN: JSON.stringify(process.env.MAPBOXGL_ACCESS_TOKEN)
            }
        })
    ];

    var prod = [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];

    if (process.env.NODE_ENV === 'production') {
        return shared.concat(prod);
    } else {
        return shared.concat(dev);
    }
};

module.exports = configure();
