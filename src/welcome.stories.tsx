import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>Horse UI</h1>
        <ul>
          <li>一个练习的react小型组件库</li>
          <li>
            <code>https://github.com/Tatekii/horse_ui</code>
          </li>
        </ul>
      </>
    );
  },
  { info: { disable: true } }
);
