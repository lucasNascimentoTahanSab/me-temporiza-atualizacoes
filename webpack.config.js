const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|css)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  entry: path.resolve(__dirname, './public/javascripts/index.js'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js',
    library: 'bundleExport',
    libraryTarget: 'window',
    libraryExport: 'default'
  }
}