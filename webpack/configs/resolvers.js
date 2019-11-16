const path = require('path')
const paths = require('./paths')

module.exports = {
    alias: {
        // pangeaAstro: path.join(paths.src, '/pangea-astro'),
        // pangeaLogitech: path.join(paths.src, '/pangea-logitech'),
        KeyBindings: path.join(paths.src),
        KeyBindingsPkg: path.join(paths.dist),
        styles: path.join(paths.src, '/styles'),
        static: path.join(paths.src, '/static'),
        utils: path.join(paths.src, '/utils')
    },
    extensions: ['.js', '.ts', '.json', '.jsx', '.css'],
    modules: paths.resolveModules
}
