const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config.js');

delete webpackConfig.devServer;

// set process.env.NODE_ENV explicitly
process.env.NODE_ENV = 'production';

webpackConfig.plugins = webpackConfig.plugins.concat([
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new UglifyJSPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'production'",
  }),
]);

module.exports = webpackConfig;
