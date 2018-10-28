const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const _webpackConfiguration = {
    entry:{
        logger:path.join(__dirname,'index')
    },
    output: {
        path: path.join(__dirname,'dist'),
        libraryTarget: "var",
        library: 'Logger',
        filename: "[name].min.js"
    },
    module: {
        rules: [{
            test:/\.(js)$/,
            exclude:/(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname,'dist')]),
    ]
};

module.exports = _webpackConfiguration;