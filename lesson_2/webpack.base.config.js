import Config from 'webpack-config';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
})

/*
const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css"
});
*/

export default new Config().merge({
  entry: './index.js',
  output: {
    path: __dirname + '/public',
  },
  module: {
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
              test: /\.scss$/,
              use: ExtractSass.extract({
                use: [{
                  loader: "css-loader"
                }, {
                  loader: "sass-loader"
                }],
                fallback: "style-loader"
              })
            },
        ] 
  },
  plugins: [
    //extractCSS,
    //new ExtractTextPlugin("styles.css"),
    new ExtractTextPlugin("[name].bundle.[hash].css"),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: "body"
    })]
});
