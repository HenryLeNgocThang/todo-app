const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    host: "192.168.2.110",
    // https: true,
    // http2: true
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/assets/js'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        }]
      }
    ]
  }
});