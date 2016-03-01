'use strict';
/**
 * Webpack config
 * This file compiles the SCSS and JS according
 * to the build environment.
 */

 // todo: add autoprefixer
 // todo: add postcss
 // todo: add react debug stuff?

// Modules
var path = require('path');
var webpack = require('webpack');

module.exports = function makeWebpackConfig(options) {

    // Setup the actual config
    var config = {
        module: {
            loaders: []
        },
        plugins: []
    };

    /*
    Setup entrypoint
    */
    config.entry = './src/index.jsx'

    /*
    Setup output
    */
    config.output = {
        path: __dirname,
        filename: options.environment == 'production' ? '[name].[hash].js' : 'bundle.js',
        chunkFilename: options.environment == 'production' ? '[name].[hash].js' : '[name].bundle.js'
    };

    /* Babel Loader for transpiling JS
     * Reference: http://webpack.github.io/docs/
     */
    var babelLoader = {
        test: /\.jsx?$/, // .js*
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
            presets: ['react', 'es2015']
        }
    };

    // Enable hot reloading when in dev mode
    if(options.environment == 'development') {
        babelLoader.query.presets.push('react-hmre');
    }
    config.module.loaders.push(babelLoader);

    /*
    Setup devtool according to environment
    */
    if(options.environment == 'production') {
        config.devtool = 'source-map';
    } else if(options.environment == 'testing') {
        config.devtool = 'inline-source-map';
    } else {
        config.devtool = 'cheap-module-eval-source-map';
    }

    /*
    Setup appconfig
    */
    config.plugins.push(
        new webpack.DefinePlugin({
            'APPCONFIG': options.appConfig
        })
    );

    /*
    Setup plugins according to environment
    */
    if(options.environment == 'production') {
        config.plugins.push(
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin()
        );
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
        );
    } else {
        config.plugins.push(
            new webpack.NoErrorsPlugin()
        );
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        outputPath: __dirname,
        /*watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },*/ // Uncomment for VirtualBox mount problems with reloading/watching
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    };

    return config;
};
