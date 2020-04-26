const path = require('path')

// load contents of .env file into `process.env` object
// process.env.NODE_ENV is set by the use of `cross-env` in the package.json scripts
const envFile = path.join(__dirname, `.env.${process.env.NODE_ENV}`)
require('dotenv').config({ path: envFile })

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const envVars = Object.keys(process.env).filter((key) =>
  key.startsWith('REACT_APP_')
)

const publicPath = path.join(__dirname, 'public')

module.exports = {
  mode: process.env.NODE_ENV, // Controls whether the output is minified or not, and other optimisations
  devtool: isDev ? 'inline-source-map' : false, // Provide source maps in development mode (view source files in browser console)
  devServer: {
    contentBase: publicPath, // serve static files in this folder
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true, // don't emit a broken file to the dist folder
  },
  output: {
    filename: '[name].[hash].js', // make output files unique to avoid browser cache issues
  },
  plugins: [
    new CleanWebpackPlugin(), // delete everything in dist on a new build
    new EnvironmentPlugin(envVars), // make process.env.REACT_APP_* variables available in the client
    new HtmlWebpackPlugin({
      // build html container for the React app
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new CopyWebpackPlugin([
      // copy public files to dist folder, to make serving the built app simpler
      { from: publicPath },
    ]),
  ],
}
