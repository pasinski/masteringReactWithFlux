var webpack = require('webpack');
var path    = require('path');

module.exports = function (config) {
    config.set({
        browsers: [ 'Chrome' ], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: [ 'mocha' ], //use the mocha test framework
        files: [
            'tests.webpack.js' //just load this file
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
        },
        reporters: [ 'dots' ], //report results in this format
        webpack: {
            resolve: {
                // require files in app without specifying extensions
                extensions: ['', '.js', '.json', '.jsx', '.less'],
                alias: {
                    // pretty useful to have a starting point in nested modules
                    'appRoot': path.join(__dirname, 'js'),
                    'vendor': 'appRoot/vendor'
                }
            },
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=react,presets[]=es2015' },
                ]
            }
        },

        webpackServer: {
            noInfo: true
        }
    });
};
