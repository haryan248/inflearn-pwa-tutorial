var path = require("path");
var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
module.exports = {
    mode: "none",

    entry: {
        main: path.resolve(__dirname, "js/app.js"),
    },

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundles.js",
        publicPath: "/dist/",
    },
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: "pwa-offline-v4",
            filename: "service-worker.js",
            staticFileGlobs: ["index.html", "manifest.json", "css/*.css", "images/**.*"],
            mergeStaticsConfig: true,
        }),
    ],
};
