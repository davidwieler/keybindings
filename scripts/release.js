const fs = require('fs')
const Terser = require('terser')
const { exec } = require('child_process')

const main = './dist/index.js'
const sourceMapName = 'index.js.map'

const helpers = './dist/helpers.js'
const helpersSourceMapName = 'helpers.js.map'

const fileContents = fs.readFileSync('./dist/index.js', 'utf8')
const helperFileContents = fs.readFileSync('./dist/helpers.js', 'utf8')

const options = {
    compress: true,
    mangle: true,
    keep_fnames: true,
    sourceMap: {
        filename: sourceMapName,
        url: main
    }
}

var indexCode = {
    'index.js': fileContents
}

const mainResult = Terser.minify(indexCode, options)

fs.writeFile(main, mainResult.code, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})

fs.writeFile(`${main}.map`, mainResult.map, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})

const helperCode = {
    'helpers.js': helperFileContents
}

options.sourceMap.filename = helpersSourceMapName
options.sourceMap.url = helpers

const helperResult = Terser.minify(helperCode, options)

fs.writeFile(helpers, helperResult.code, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})

fs.writeFile(`${helpers}.map`, helperResult.map, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})
