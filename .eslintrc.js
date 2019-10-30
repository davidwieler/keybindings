const paths = require('./config/paths')
const path = require('path')

process.env.NODE_ENV = 'development'

module.exports = {
    env: {
        browser: true,
        es6: true,
        commonjs: true,
        node: true,
        jest: true,
        mocha: true
    },
    extends: [
        'wiremore',
        'wiremore/react',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
        'plugin:flowtype/recommended'
    ],
    plugins: ['security', 'prettier', 'flowtype', 'react-hooks'],
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules
            },
            webpack: {
                config: path.join(__dirname, '/config/webpack.config.js/client.base.js')
            }
        },
        react: {
            pragma: 'React', // Pragma to use, default to "React"
            version: '16.8.0' // React version, default to the latest React stable release
        },
        flowtype: {
            onlyFilesWithFlowAnnotation: true
        }
    },
    rules: {
        'import/named': 0,
        'import/no-unassigned-import': 0,
        'import/no-unresolved': 0,
        'import/no-named-as-default-member': 0,
        'import/prefer-default-export': 0,
        'prettier/prettier': 'error',
        'react/no-did-mount-set-state': 0,
        'react/no-danger': 0,
        'react-hooks/rules-of-hooks': 'error',
        'security/detect-object-injection': 0,
        'react-hooks/exhaustive-deps': 0
    }
}
