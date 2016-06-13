var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(__dirname);
var configure = () => {
    var shared = [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
    ]
    if (process.env.NODE_ENV === 'production') {
        return shared.concat([
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false,
                },
            }),
            new webpack.optimize.OccurenceOrderPlugin()
        ]);
    } else {
        return shared;
    }
}

module.exports = configure();
