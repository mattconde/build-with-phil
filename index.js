import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";

const mount = () => {
  const App = require("scripts/app").default;
  render(<App />, document.getElementById("root"));
};
