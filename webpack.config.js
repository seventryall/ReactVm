var webpack = require('webpack');
module.exports = {
    entry: [
      "./src/index.tsx"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
    {
        test: /\.tsx?$/, loader: 'ts-loader'
    }]
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    }

};