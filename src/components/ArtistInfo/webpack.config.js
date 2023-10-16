require('dotenv').config()

const path = require('path');
const Dotenv = require('dotenv-webpack');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: '../../index.ts',
  output: {
    filename: 'Artist.js',
    path: path.resolve(__dirname),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv({
      path: '../../../.env', // load this now instead of the ones in '.env'
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      ignoreStub: true
    }),
  ]
};