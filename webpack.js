'use strict';
/**
* Webpack config
* This file compiles the SCSS and JS according
* to the build environment.
*
* This file looks like a lot, but is nicely documented
*/

// todo: test testing output

// Modules
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function makeWebpackConfig(options) {

    // Setup the actual config
    var config = {
        module: {
            loaders: []
        },
        plugins: []
    };

    // Setup entrypoint
    config.entry = './src/index.jsx'

    // Setup output
    config.output = {
        path: options.environment == 'production' ? __dirname + '/build' : __dirname,
        filename: options.environment == 'production' ? '[name].[hash].js' : 'bundle.js',
        chunkFilename: options.environment == 'production' ? '[name].[hash].js' : '[name].bundle.js'
    };

    // Babel Loader for transpiling JS
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


    //Setup SASS loading and autoprefixer
    var sassLoader = {
        test: /\.scss$/,
        loader: 'style!css!postcss-loader!sass'
    };

    // Setup extracting of css into a seperate file
    if(options.environment == 'production') {
        sassLoader.loader = ExtractTextPlugin.extract("style-loader", 'css!postcss-loader!sass')
        config.plugins.push(
            new ExtractTextPlugin("[name].[hash].css", {
                allChunks: true
            })
        );
    }

    config.module.loaders.push(sassLoader);
    config.postcss = [ autoprefixer({ browsers: ['last 2 versions'] }) ];

    // Enable loaders for Bootstrap (fonts and urls)

    var woffLoader = {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" };
    var fileLoader = {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" };
    config.module.loaders.push(woffLoader);
    config.module.loaders.push(fileLoader);

    // Setup devtool according to environment
    if(options.environment == 'production') {
        config.devtool = 'source-map';
    } else if(options.environment == 'testing') {
        config.devtool = 'inline-source-map';
    } else {
        config.devtool = 'cheap-module-eval-source-map';
    }

    // Setup appconfig, this get's injected into the builded app
    config.plugins.push(
        new webpack.DefinePlugin({
            'APPCONFIG': options.appConfig
        })
    );

    // Setup plugins according to environment
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
