var webpack = require('webpack')
var path = require('path');

module.exports = env => {
    const noDevServer = env.noDevServer
    return {
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
        ...(noDevServer && {devtool: false}),
        ...(!noDevServer && {devServer: {
            contentBase: path.join(__dirname, "./"),
            port: 3000,
            publicPath: "http://localhost:3000/",
            hotOnly: true
        },
        plugins: [new webpack.HotModuleReplacementPlugin()]
        })
    }
}