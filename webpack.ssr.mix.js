const path = require("path");
const mix = require("laravel-mix");
const webpackNodeExternals = require("webpack-node-externals");

mix
  .options({ manifest: false })
  .js("resources/js/ssr.js", "public/static/js")
  .react()
  .alias({ "@": path.resolve("resources/js") })
  .webpackConfig({
    target: "node",
    externals: [webpackNodeExternals()],
  });
