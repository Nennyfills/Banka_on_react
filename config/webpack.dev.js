const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    port: 4090,
    historyApiFallback: true,
  },
};
