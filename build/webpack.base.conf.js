var path = require('path')
var utils = require('./utils')
var config = require('../config')
const autoprefixer = require('autoprefixer');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

// const remote-assets-loader = require('./remote-assets-loader')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        vendor: ['react', 'react-dom',resolve('src/reactRouter.js')],
        index: [resolve('samples/main.jsx')]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.prod.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json','.ts', '.tsx']
    },
    resolveLoader: {
        alias: {
            "remote-loader":  path.join(__dirname,"remote-loader")
        },
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
              use: ['ts'],
              // enforce: "pre",
              include: [resolve('src/components/antd')],
              // options: {
              //   formatter: require('eslint-friendly-formatter')
              // }
            },
            {
                test: /\.(js|jsx)$/,
                use: ['react-hot-loader', 'babel-loader'],
                include: [resolve('samples'), resolve('src'), resolve('test')]
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    query: {
                      limit: 10000,
                      name: utils.assetsPath('images/[name].[hash:7].[ext]')
                    }
                  }
                ],
            },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url',
            //     query: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     }
            // },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: ['remote-loader-loader']
            },
        ],

    },
    plugins: [
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, '../node_modules')),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            autoprefixer({
              browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4']
            })
          ]
        }
      }),
        // 复制无需编译的静态资源到dist/static/目录中
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
}
