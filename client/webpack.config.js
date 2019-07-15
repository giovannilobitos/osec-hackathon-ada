const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const settings = require('./config');

process.env.NODE_ENV = 'development';

Object.keys(settings).forEach((i) => {
  settings[i] = JSON.stringify(settings[i]);
});


const config = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    port: 6060,
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/',
    },
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.gif/,
        loader: 'file-loader',
      },
      {
        test: /\.mp3/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$|\.ico$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        }],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        SETTINGS: JSON.stringify(process.env.SETTINGS || 'local'),
        ...settings,
      },
    }),
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    //   jquery: 'jquery',
    //   $: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.jquery': 'jquery',
    //   'window.$': 'jquery',
    // }),
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({ title: settings.title, template: 'index.html' }),
  ],
};

module.exports = config;
