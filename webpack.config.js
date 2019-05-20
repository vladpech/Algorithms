const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const CopyPlugin = require('copy-webpack-plugin');
const distDirectory = "/dist";

module.exports = {
    "mode": "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + distDirectory
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CheckerPlugin(),
        new CopyPlugin([
            {from: './src/Content/main.css', to: distDirectory},
            {from: './src/index.html', to: distDirectory}
        ])
    ]
};