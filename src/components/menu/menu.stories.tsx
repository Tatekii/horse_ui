import React from "react";
import Menu from "./";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const Default = () => (
  <Menu>
    <Menu.Item>item1</Menu.Item>
    <Menu.Item>item2</Menu.Item>
  </Menu>
);

const OnSelect = () => (
  <Menu
    onSelect={(i) => {
      action("select index");
      console.log(i);
    }}
  >
    <Menu.Item>item1</Menu.Item>
    <Menu.Item>item2</Menu.Item>
  </Menu>
);

const Disabled = () => (
  <Menu>
    <Menu.Item>item1</Menu.Item>
    <Menu.Item disabled>item2</Menu.Item>
  </Menu>
);

const WithSubMenu = () => (
  <Menu>
    <Menu.Item>item1</Menu.Item>
    <Menu.Item>item2</Menu.Item>
    <Menu.SubMenu title="subTitle">
      <Menu.Item>item2-1</Menu.Item>
      <Menu.Item>item2-2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

const WithDefaultIndex = () => (
  <Menu defaultIndex="1">
    <Menu.Item>item1</Menu.Item>
    <Menu.Item>item2</Menu.Item>
    <Menu.SubMenu title="subTitle">
      <Menu.Item>item2-1</Menu.Item>
      <Menu.Item>item2-2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

const WithDefaultExpand = () => (
  <Menu expandMenus={["2"]} mode="vertical">
    <Menu.Item>item1</Menu.Item>
    <Menu.Item>item2</Menu.Item>
    <Menu.SubMenu title="subTitle">
      <Menu.Item>item2-1</Menu.Item>
      <Menu.Item>item2-2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

storiesOf("Menu", module)
  .add("default", Default)
  .add("onselect callback", OnSelect)
  .add("disabled", Disabled)
  .add("Menu.SubMenu", WithSubMenu)
  .add("default active", WithDefaultIndex)
  .add("default vertical expand Menu.SubMenu", WithDefaultExpand);
