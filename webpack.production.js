/**
 * Webpack config for production
 * Check webpack.js for actual building
 */
module.exports = require('./webpack')({
    outputFiles: true,
    environment: 'production',
    appConfig: {'environment': JSON.stringify('production')} // This gets injected into the compiled JS
});
