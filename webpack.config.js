module.exports = {
    entry:['babel-polyfill', './src/app/index.js'],
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
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      "@babel/env",
                      "@babel/react"
                    ]
                  },
                },
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