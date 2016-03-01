/**
 * Webpack config for development
 * Check webpack.js for actual building
 */
module.exports = require('./webpack')({
    outputFiles: false, // Keep in memory
    environment: 'development',
    appConfig: {'environment': JSON.stringify('development')} // This gets injected into the compiled JS
});
