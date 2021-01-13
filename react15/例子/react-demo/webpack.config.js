var webpack = require('webpack')
var path = require('path');

const noDevServer = process.env.npm_package_config_noDevServer
module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.join(__dirname),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.js|jsx$/, 
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets:["@babel/preset-react","@babel/preset-env",]
                    }
                } 
            }
          ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    devtool:false,
    ...(!noDevServer && {devServer: {
        contentBase: path.join(__dirname, "./"),
        port: 3000,
        publicPath: "http://localhost:3000/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
    })
}