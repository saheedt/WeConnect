const DotEnv = require('dotenv');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

DotEnv.config({ path: `${__dirname}/.env` });

const dotEnv = new webpack.DefinePlugin({
  'process.env': {
    BASE_URL: JSON.stringify(process.env.BASE_URL),
    CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
    CLOUDINARY_API_KEY: JSON.stringify(process.env.CLOUDINARY_API_KEY),
    CLOUDINARY_API_SECRET: JSON.stringify(process.env.CLOUDINARY_API_SECRET)
  }
});
// const htmlWebpackPlugin = new HtmlWebpackPlugin({
//   template: 'client/src/index.html'
// });
const extractPlugin = new ExtractTextPlugin({
  filename: 'secondary.css'
});

// const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'client/src');

const config = {
  node: {
    fs: 'empty'
  },
  entry: { main: path.join(SRC_DIR, '/WeconnectRoot.js') },
  output: {
    path: '/',
    filename: 'bundle.js',
    // publicPath: '/'
  },
  module: {
    // loaders
    rules: [
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
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          fallback: 'style-loader', use: ['url-loader']
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: { noquotes: true }
      },
      {
        test: /\.(png|jpg|gif|jpeg|eot|ttf|woff|woff2|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    extractPlugin,
    dotEnv,
    // htmlWebpackPlugin
  ]
};

module.exports = config;
