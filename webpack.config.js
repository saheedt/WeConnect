const DotEnv = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

DotEnv.config({ path: `${__dirname}/.env` });

const dotEnv = new webpack.DefinePlugin({
  'process.env': {
    BASE_URL: JSON.stringify(process.env.BASE_URL),
  }
});
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: 'client/src/index.html'
});

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'client/src');

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
        test: /\.jsx?$/,
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
        test: /\.(png|jpg|gif|svg|jpeg|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    dotEnv,
    htmlWebpackPlugin
  ]
};

module.exports = config;
