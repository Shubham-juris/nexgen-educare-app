const path = require('path');

module.exports = {
  // Entry point for the application
  entry: './src/index.js', // Adjust based on your entry file

  // Output location for the bundled files
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // You can adjust the filename as needed
  },

  // Module rules for processing files
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules from transpiling
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JavaScript/JSX
        },
      },
    ],
  },

  // Resolve extensions for importing JS/JSX files
  resolve: {
    extensions: ['.js', '.jsx'], // Allow import without specifying extensions
  },

  // Optional: Enable source maps for debugging
  devtool: 'source-map',

  // Optional: Set up dev server if needed
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000, // You can change the port
    hot: true, // Enable hot reloading
  },
};
