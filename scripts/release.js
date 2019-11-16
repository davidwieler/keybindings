const fs = require('fs')
const Terser = require('terser')

const main = './dist/index.js'
const sourceMapName = 'index.js.map'
const sourceMapURL = './dist/index.js.map'

const fileContents = fs.readFileSync('./dist/index.js', 'utf8')

var options = {
    compress: true,
    mangle: true,
    keep_fnames: true,
    sourceMap: {
        filename: sourceMapName,
        url: sourceMapURL
    }
}

var result = Terser.minify(fileContents, options)

fs.writeFile(main, result.code, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})

fs.writeFile(sourceMapURL, result.map, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})
