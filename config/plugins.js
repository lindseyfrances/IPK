var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(__dirname);
var configure = () => {
    var dev = [
        new webpack.HotModuleReplacementPlugin()
    ];

    var shared = [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
    ]

    var prod = [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]

    if (process.env.NODE_ENV === 'production') {
        return shared.concat(prod);
    } else {
        return shared.concat(dev);
    }
}

module.exports = configure();
