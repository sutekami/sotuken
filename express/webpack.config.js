const path = require('path');
const rules = require('./webpack_config/rules');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: rules,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  target: ['node'],
  devtool: 'cheap-module-source-map',
  stats: {
    errorDetails: true,
  },
  cache: false,
};
