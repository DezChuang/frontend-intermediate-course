var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/assets/js/index.js",
  output: {
    path: __dirname + "/build", //output file directory
    filename: "bundle.js" //pack all .js file into bundle.js
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=assets/img/[name].[ext]'
      }
    ]
  }
}
