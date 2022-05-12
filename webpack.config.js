module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js',
        publicPath: '/'
    },
    module:{
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: 'app/ui/www',
        devtool: 'eval',
        hot: true,
        inline: true,
        port: 3000,
        historyApiFallback: true,
    }
}