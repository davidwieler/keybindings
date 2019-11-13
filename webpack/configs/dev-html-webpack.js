const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
    new HtmlWebpackPlugin({
        inject: true,
        template: './demo/index.html',
        filename: 'index.html'
    })
]
