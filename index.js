import "@babel/polyfill";
import React from "react";
import { hydrate, render } from "react-dom";
import { AppContainer } from "react-hot-loader";

const mount = (isInitial = true) => {
  const App = require("./scripts/app").default;
  const r = isInitial ? render : hydrate;
  r(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

mount();

if (module.hot) {
  module.hot.accept("scripts/app", () => {
    mount(false);
  });
}
