import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>Horse UI</h1>
        <h3>Checkout README</h3>
      </>
    );
  },
  { info: { disable: true } }
);
