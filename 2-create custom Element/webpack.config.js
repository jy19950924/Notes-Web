const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './app.js',
    output: {
        filename: './built.js',
        path: resolve(__dirname, './build/js')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            esModule: false,
                            name: '[hash:10].[ext]'
                        }
                    }
                ]

            },
            {
                exclude: /\.(css|js|html|less)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    mode: 'development',
    devServer: {
        // contentBase 已经废弃
        // contentBase: join(__dirname, 'build/js'),
        static: {
            directory: resolve(__dirname, 'build/js'),

        },
        // compress: true,   // default is true
        port: 5678,
        open: true
    }
}