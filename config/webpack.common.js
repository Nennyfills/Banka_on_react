const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@App': path.resolve(__dirname, '../src/components/app'),
      '@Actions': path.resolve(__dirname, '../src/actions/'),
      '@Reducers': path.resolve(__dirname, '../src/reducers/'),
      '@Components': path.resolve(__dirname, '../src/components/'),
      '@Auth': path.resolve(__dirname, '../src/components/auth/'),
      '@Login': path.resolve(__dirname, '../src/components/Login/'),
      '@Client': path.resolve(__dirname, '../src/components/Client/'),
      '@Profile': path.resolve(__dirname, '../src/components/Client/Profile'),
      '@Utilities': path.resolve(__dirname, '../src/utils/'),
      '@Images': path.resolve(__dirname, '../public/asset'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
};
