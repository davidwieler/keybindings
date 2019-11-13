const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelLoader = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
}

const scssLoaderClient = {
    test: /\.(sa|sc|c)ss$/,
    use: [
        // fallback to style-loader in development
        // which creates style nodes from JS strings (IE: imports)
        process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ]
}

const urlLoaderClient = {
    test: /\.(png|jpe?g|gif)$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 2048,
        name: 'assets/[name].[ext]'
    }
}

const fileLoaderClient = {
    exclude: [/\.(js|ts|css|mjs|html|json|ejs)$/],
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'assets/[name].[ext]'
            }
        }
    ]
}

// Write css files from node_modules to its own vendor.css file
const externalCssLoaderClient = {
    test: /\.css$/,
    include: /node_modules/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
}

const typeScriptClient = {
    test: /\.ts(x)?$/,
    use: [
        {
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: 'tsconfig.json'
            }
        }
    ],
    exclude: /node_modules/
}

const client = [
    {
        oneOf: [
            typeScriptClient,
            babelLoader,
            scssLoaderClient,
            urlLoaderClient,
            fileLoaderClient,
            externalCssLoaderClient
        ]
    }
]

module.exports = {
    client
}
