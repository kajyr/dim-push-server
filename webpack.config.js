require("dotenv").config();
const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./fe-src/index",
  devtool: isProduction ? "none" : "cheap-source-map",
  output: {
    path: path.resolve(__dirname, "public"), // string
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin({ sourceMap: true })],
  },
  devServer: {
    contentBase: "./public",
  },
  plugins: [],
};
