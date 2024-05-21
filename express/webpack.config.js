/** @type {import('webpack').Configuration} */

const path = require('path');
const nodeExternals = require('webpack-node-enternals');

const config = {
  mode: "development",
  entry: './source/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  extenals: [nodeExternals()],
  module: {
    rules: [
      {
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extentions: [".ts", ".js"]
  },
};

module.exports = config;
