const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[folder]__[local]--[hash:base64:5]",
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  }
});