const fs = require("fs");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

const compiler = webpack(require("./webpack.config.js"));
const devMiddleware = webpackDevMiddleware(compiler, {
  index: false,
  publicPath: "/_build/"
});

app.use(devMiddleware);
app.get("*", (req, res) => {
  const template = fs.readFileSync("./index.html", { encoding: "utf8" });
  res.send(template.replace("%REACT_HTML%", ""));
});

app.listen(3003, () => {
  console.log("> Fire up the server");
});
