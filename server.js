const fs = require("fs");
const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const { renderToString } = require("react-dom/server");
const { createElement } = require("react");
const { ServerStyleSheet } = require("styled-components");

const app = express();

const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  index: false,
  publicPath: "/_build/"
});

let isValid = false;
const waitUntilValid = new Promise(resolve => {
  devMiddleware.waitUntilValid(() => {
    isValid = true;
    resolve();
  });
});

app.use((req, res, next) => {
  if (isValid) {
    next();
  }

  waitUntilValid.then(() => next());
});

app.use(devMiddleware);
app.get("*", (req, res) => {
  const App = require(path.join(
    webpackConfig.output.path,
    "server/scripts/app.js"
  ));
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(createElement(App.default)));
  const template = fs.readFileSync("./index.html", { encoding: "utf8" });
  const css = sheet.getStyleTags();
  res.send(template.replace("%REACT_HTML%", html).replace("%STYLE_HTML%", css));
});

app.listen(3003, () => {
  console.log("> Fire up the server");
});
