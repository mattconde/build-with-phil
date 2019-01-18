const { resolve } = require("path");
const { interpolateName, getOptions } = require("loader-utils");
const { transform } = require("@babel/core");

const context = process.cwd();
const jsRe = /\.jsx?$/;
const outputPattern = "server/[path][name].[ext]";

function emitFileLoader(content, sourceMap) {
  this.cacheable();
  const callback = this.async();

  const inputName = resolve(
    context,
    interpolateName(this, "[path][name].[ext]", {
      context,
      content
    })
  );

  const isJSFile = jsRe.test(inputName);

  const outputName = interpolateName(
    this,
    `${outputPattern}${isJSFile ? "" : ".js"}`,
    {
      context,
      content
    }
  );

  if (!isJSFile) {
    this.emitFile(outputName, content, sourceMap);
  } else {
    const res = transform(content, {
      babelrc: false,
      sourceMaps: true,
      plugins: [require.resolve("@babel/plugin-transform-modules-commonjs")],
      filename: inputName,
      inputSourceMap: sourceMap || undefined
    });

    this.emitFile(outputName, res.code, res.map);
  }

  callback(null, content, sourceMap);
}

module.exports = emitFileLoader;
