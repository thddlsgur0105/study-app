const path = require("path");

module.exports = {
    entry: "./src/client/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "assets", "js")
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ]
                    }
                }
            }
        ]
    }
}
