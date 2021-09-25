import { resolve as _resolve } from 'path'

export const module = {
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
}
export const resolve = {
  extensions: ['*', '.js', '.jsx']
}
export const entry = _resolve(__dirname, './public/javascripts/index.js')
export const output = {
  publicPath: '/',
  path: _resolve(__dirname, './public/dist'),
  filename: 'bundle.js',
  library: 'bundleExport',
  libraryTarget: 'window',
  libraryExport: 'default'
}