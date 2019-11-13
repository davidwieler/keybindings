const env = require('yargs').argv
const paths = require('./configs/paths')
const resolvers = require('./configs/resolvers')
const { client: loaders } = require('./configs/loaders')
const plugins = require('./configs/plugins')

let mode = 'production'

if (env.mode !== 'production') {
    mode = 'development'
}

process.env.NODE_ENV = env.mode

const config = {
    mode: mode,
    entry: {
        package: paths.srcEntry
    },
    devtool: 'none',
    output: {
        path: paths.dist,
        filename: `[name].js`,
        library: 'Keybindings',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
        rules: loaders
    },
    resolve: { ...resolvers },
    plugins: [...plugins.client],
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
    // optimization: {
    // 	// We no not want to minimize our code.
    // 	minimize: false
    // }
}

module.exports = config
