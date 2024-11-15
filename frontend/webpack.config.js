const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your entry point
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /pdf\.worker(\.min)?\.js$/,
        use: { loader: "file-loader", options: { name: "[name].[ext]" } },
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: "worker-loader",
          options: {
            inline: "fallback",
          },
        },
      },
      // Other rules...
    ],
  },
  // Other configurations...
};
