const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimazeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
  const config =  {
    splitChunks: {
      chunks: 'all'
    }
  }
  if(isProd) {
    config.minimizer = [
      new OptimazeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
};
const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ]
  if(extra) {
    loaders.push(extra)
  }
  return loaders
};
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const babelOptions = presets => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: []
  }

  if(presets) {
    opts.presets.push(presets)
  }

  return opts;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js')
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Tetris',
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  devServer: {
    port: 4400
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      }, 
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpeg|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|wof2|eot)$/,
        use: ['file-loader']
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      }
    ]
  }
}
