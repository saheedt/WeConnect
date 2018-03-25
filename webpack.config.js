const DotEnv = require('dotenv');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

DotEnv.config({ path: `${__dirname}/.env` });

const extractPlugin = new ExtractTextPlugin({
  filemame: 'styles.css'
});
const dotEnv = new webpack.DefinePlugin({
  'process.env': {
    BASE_URL: JSON.stringify(process.env.BASE_URL),
    PORT: process.env.PORT2
  }
});
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: 'src/index.html'
});


const DIST_DIR = path.resolve(__dirname, 'dist'),
  SRC_DIR = path.resolve(__dirname, 'client/src');

const config = {
  entry: `${SRC_DIR}/WeConnectRoot.js`,
  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'stage-2', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'scss-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    dotEnv,
    extractPlugin,
    htmlWebpackPlugin
  ]
};

module.exports = config;
