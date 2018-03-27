const DotEnv = require('dotenv');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

DotEnv.config({ path: `${__dirname}/.env` });

// const extractPlugin = new ExtractTextPlugin({
//   filename: 'styles.css'
// });
// use: extractPlugin.extract({
//   fallback: 'style-loader',
//   use: ['css-loader', 'sass-loader']
// })
const dotEnv = new webpack.DefinePlugin({
  'process.env': {
    BASE_URL: JSON.stringify(process.env.BASE_URL),
    // PORT: process.env.PORT
  }
});
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: 'client/src/index.html'
});


const DIST_DIR = path.resolve(__dirname, 'dist'),
  SRC_DIR = path.resolve(__dirname, 'client/src');

const config = {
  entry: path.join(SRC_DIR, '/WeconnectRoot.js'),
  output: {
    path: path.join(DIST_DIR),
    filename: 'bundle.js',
    publicPath: '/'
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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    dotEnv,
    // extractPlugin,
    htmlWebpackPlugin
  ]
};

module.exports = config;
