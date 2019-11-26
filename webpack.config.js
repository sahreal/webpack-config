/*
  A comment that starts like this:
  // ***
  Means that the line is mandatory for Webpack to work, not just a cool 'lil doo-dad I'd recommend you use.
*/

// *** Things to npm install with the --save-dev flag: mini-css-extract-plugin webpack babel @babel/core @babel/preset-env babel-loader html-webpack-plugin webpack webpack-cli css-loader @babel/preset-react

// *** Note that I have babel presets in a separate file ("/.babelrc"). You need this as well. For react and redux apps, you can copy and paste it as is.

const webpack = require("webpack");
const path = require("path");

// Why should I include the below line:
// ONLY if you are importing CSS files into JS/JSX files.

// What does it do:
// It will compress all CSS that is imported by those JS files into one big stylesheet at build time, as opposed to injecting style tags into your <head></head> one by one at run time.

// Result:
// BIG time performance optimization!
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  // Adding this line is necessary for seeing stack traces for action objects in Redux dev tools. It's not the only thing you need to do, though - check this link for full details:https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Features/Trace.md
  devtool: "source-map",

  // *** "Entry" is the file where webpack starts its process of bundling your code and its dependencies. It should be the beginning of your CLIENT side JS - NOT the JS that runs your server/db.
  entry: "./client/index.js",

  // *** "Output" is where webpack will put the transpiled & bundled code. The directory should be the same directory as what express.static() is looking at (or would look at, if you're not using express.static()). You MUST include the path to this file in a script tag in your index.html. The bundled file and your index.html should be in the same folder (in the case of this example, it would be /dist)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  // *** From webpack documentation for module: "These options determine how the different types of modules within a project will be treated." By module, they mean each individual JS or JSX file you will be transpiling and bundling via webpack.

  // See the notes inside the rules to understand their syntax
  module: {
    rules: [
      {
        // *** If file has this extension (in this case, JS or JSX)
        test: /\.(js|jsx)$/, // You shouldn't know how to write these regular expressions. Google how to do it when you need to - include "webpack" in the google search.

        // *** and they are not node modules
        exclude: /node_modules/,
        // *** the "loader" to use to transpile this code.
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        // When you have multiple loaders in array (like below), Webpack uses them in reverse order
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  // This sets up auto-updating on-save once you run the script. In most instances you'd have to be a psycho not to want this, but it's not necessary.
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },

  // Why include the below line:
  // If you want to import files without providing their extensions.

  // What it does:
  // It looks for files with the given path and name you've provided, and iterates through the array of extensions until it finds an existing file that has the given extension. The default is [".js"], so if you override that default here, make sure to put in ".js" as the first option - unless you don't want that behavoir!

  // Result:
  // Slightly cleaner code.
  resolve: {
    extensions: [".js", ".jsx"]
  },
  // *** Necessary to include plugins here if you're using any.
  plugins: [new MiniCssExtractPlugin()]
};

module.exports = config;
