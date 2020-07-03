const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const Webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const pwa_testing = process.env.NODE_ENV === 'pwa_testing';
const pluginArray = [];

pluginArray.push(
  new CleanWebpackPlugin(),
  new Webpack.optimize.ModuleConcatenationPlugin(),
  new MiniCssExtractPlugin({
    filename: 'assets/css/style.css'
  }),
);

if (pwa_testing) {
  let onBuildEndString = 'lighthouse http://localhost:8080 --view --output-path=';
  onBuildEndString += path.join('./report', 'lighthouse-results.report.html');

  pluginArray.push(new WebpackShellPlugin({
    onBuildStart: ['http-server dist -a localhost']
  }));

  pluginArray.push(new WebpackShellPlugin({
    onBuildEnd: [onBuildEndString]
  }));
}

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  plugins: pluginArray,
  output: {
    filename: 'assets/js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              sassOptions: {
                outputStyle: 'compressed',
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          }
        ],
      }
    ]
  }
});