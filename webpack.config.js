const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET
process.env.PORT = 3001
process.env.HOST = 'localhost'

const PATHS = {
  app: path.join(__dirname, 'src'),
  react: path.resolve('./node_modules/react')
}

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {react: PATHS.react}
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint',
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      }
    ]
  }
}

if (TARGET === 'start' || !TARGET) {
  const config = merge(common, {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({
        url: `http://${process.env.HOST}:${process.env.PORT}/`
      }),
      new NpmInstallPlugin({
        save: true
      }),
      new HtmlWebpackPlugin({
        template: PATHS.app + '/index.html',
        inject: 'body'
      })
    ]
  })
  module.exports = config
}

if (TARGET === 'build') {
  module.exports = merge(common, {})
}
