const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const paths = {
    dist: resolveApp('dist'),
    demo: resolveApp('demo'),
    src: resolveApp('src'),
    webpackConfig: resolveApp('webpack/config')
}

paths.resolveModules = [paths.srcEntry, paths.src, 'node_modules']

module.exports = paths
