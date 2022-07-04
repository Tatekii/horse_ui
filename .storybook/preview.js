import "../src/styles/index.scss";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { configure } from "@storybook/react";
library.add(fas);

const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);