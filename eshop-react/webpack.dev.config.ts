import Dotenv from 'dotenv-webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    https: false,
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 4000,
    /*
    proxy: {
      '/api': 'http://localhost:5000',
    },
    devMiddleware: {
      writeToDisk: false,
    },
    */
  },
};

export default config;
