var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/assets/js/index.js",
  output: {
    path: __dirname + "/build", //output file directory
    filename: "bundle.js" //pack all .js file into bundle.js
  }
}
