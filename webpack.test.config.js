/**
 * Webpack config for tests
 * Check webpack.js for actual building
 */
module.exports = require('./webpack')({
    outputFiles: false,
    environment: 'testing',
    appConfig: {'environment': JSON.stringify('testing')} // This gets injected into the compiled JS
});
