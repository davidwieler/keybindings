const webpack = require('webpack')
const baseConfig = require('./webpack.config')
const path = require('path')
const paths = require('./configs/paths')
const env = require('yargs').argv // use --env with webpack 2
const CopyWebpackPlugin = require('copy-webpack-plugin')

const WEBPACK_PORT = process.env.PORT || 8500

// Dev Scripts
const htmlWebpackIncludes = require('./configs/dev-html-webpack')

const config = {
    ...baseConfig,
    entry: {
        ...baseConfig.entry,
        demo: './demo/demo.js'
    },
    plugins: [
        ...baseConfig.plugins,
        ...htmlWebpackIncludes,
        new webpack.ProvidePlugin({}),
        new CopyWebpackPlugin([{ from: path.join(__dirname, '../demo', `static`), to: 'static' }])
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

    externals: {
        $: 'jquery',
        _: 'underscore',
        JsCookie: 'js-cookie'
    },
    watch: true
}

module.exports = config
