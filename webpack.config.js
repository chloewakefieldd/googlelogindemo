const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'production';
const isProduction = env === 'production';
const mode = isProduction ? 'production' : 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entryFile = isProduction ? 'dist/client.js' : 'src/client.tsx';

function getPlugins() {
  return [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new HtmlWebpackPlugin({
      title:
        'AppTitle',
      template: 'src/views/main.html',
      favicon: 'src/static/favicon.png',
      filename: 'main.html'
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.[chunkhash].css' })
  ];
}

module.exports = {
  mode,
  entry: path.resolve(__dirname, `./${entryFile}`),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'index.[chunkhash].js',
    publicPath: './'
  },
  devtool: isProduction ? false : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: isProduction
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: getPlugins()
};