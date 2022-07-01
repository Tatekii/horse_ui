import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Input from "./index";
import Icon from "../icon";

const DefaultInput = () => {
  const [content, setContent] = useState<string>();

  return (
    <div>
      <h1>Controlled Input</h1>
      <Input
        style={{ width: "300px" }}
        placeholder="placeholder"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div>input content:{content}</div>
    </div>
  );
};
const disabledInput = () => (
  <Input style={{ width: "300px" }} placeholder="disabled input" disabled />
);

const iconInput = () => (
  <Input
    style={{ width: "300px" }}
    placeholder="input with icon"
    icon="search"
  />
);

const sizeInput = () => (
  <>
    <Input style={{ width: "300px" }} defaultValue="large size" size="large" />
    <Input style={{ width: "300px" }} placeholder="small size" size="small" />
  </>
);

const pandInput = () => (
  <>
    <Input
      style={{ width: "300px" }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      style={{ width: "300px" }}
      defaultValue="google"
      append={
        <>
          <Icon icon="search" />
          Search
        </>
      }
    />
  </>
);

storiesOf("Input", module)
  .add("Default Input", DefaultInput)
  .add("被禁用的 Input", disabledInput)
  .add("带图标的 Input", iconInput)
  .add("大小不同的 Input", sizeInput)
  .add("带前后缀的 Input", pandInput);
