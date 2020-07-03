const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const manifestConfig = require('./src/data/manifest.json');
const config = require('./src/data/config.json');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'src', 'assets');
const development = process.env.NODE_ENV === 'development';
let assetURL;
development ? assetURL = "" : assetURL = config.assetURL;

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: './entries/frontend.js',
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                    from: path.resolve(__dirname, 'src/assets/img'),
                    to: 'assets/img'
                },
                {
                    from: path.resolve(__dirname, 'src/assets/fonts'),
                    to: 'assets/fonts'
                },
                {
                    from: path.resolve(__dirname, 'src/data'),
                    to: 'data'
                },
            ],
        }),
        new HtmlWebpackPlugin({
            chunks: ['app'],
            excludeChunks: [],
            manifestConfig: manifestConfig,
            scriptLoading: 'defer',
            filename: 'index.html',
            template: 'templates/index.hbs',
            minify: true,
            assetURL: assetURL,
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: './service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 512000,
        }),
    ],
    resolve: {
        modules: [
            dirAssets,
            dirApp,
            dirNode,
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: 'handlebars-loader',
                    options: {
                        partialDirs: [
                            path.join(__dirname, 'src', 'templates')
                        ]
                    }
                }
            }
        ],
    }
};