const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const base = {
  entry: {
    ui: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    })
  ],
}


const dev = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  }
}


module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    return Object.assign({}, base, dev)
  }

  if (argv.mode === 'production') {
    return base
  }

  return base
};