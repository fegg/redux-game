var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.bundle.js',
        path: path.join(__dirname, './'),
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: 'es2015'
            },
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['', '.js'],
    }
}