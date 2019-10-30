const webpack = require('webpack')
const baseConfig = require('./webpack.config')
const path = require('path')
const paths = require('./configs/paths')
const env = require('yargs').argv // use --env with webpack 2
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const WEBPACK_PORT = process.env.PORT || 6060

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    ...baseConfig,
    entry: {
        package: `${paths.src}/index.js`,
        demo: `${paths.demo}/demo.js`
    },
    output: {
        ...baseConfig.output
        // path: `${__dirname}/playground`
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './demo/index.html',
            filename: 'index.html'
        })
        // new CopyWebpackPlugin([
        //     { from: path.join(__dirname, '../playground', `static`), to: 'static' }
        // ])
    ],
    devtool: 'eval-source-map',
    performance: {
        hints: false
    },
    devServer: {
        contentBase: './demo',
        watchContentBase: true,
        inline: true,
        host: 'localhost',
        port: WEBPACK_PORT,
        open: true,
        watchOptions: {
            ignored: [/node_modules/, './dist']
        }
    },
    watch: true
}

module.exports = config
