const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: "./examples/index.tsx",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "docs", "js"),
        filename: "[name]-[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.module\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            // transpileOnly: true,
                        }
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        outputPath: "../images",
                        publicPath: "images"
                    }
                } ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".scss", ".sass"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "template.html"),
            filename: path.join(__dirname, "docs", "index.html"),
            inject: "head"
        }),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tsconfig: "./tsconfig.json"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 10000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm-${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    }
};