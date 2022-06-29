import React from "react";
import Menu from ".";
import MenuItem from "./MenuItem";
import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";
import SubMenu from "./SubMenu";
import { action } from "@storybook/addon-actions";

const Default = () => (
  <Menu>
    <MenuItem>item1</MenuItem>
    <MenuItem>item2</MenuItem>
  </Menu>
);

const OnSelect = () => (
  <Menu
    onSelect={(i) => {
      action("select index");
      console.log(i);
    }}
  >
    <MenuItem>item1</MenuItem>
    <MenuItem>item2</MenuItem>
  </Menu>
);

const Disabled = () => (
  <Menu>
    <MenuItem>item1</MenuItem>
    <MenuItem disabled>item2</MenuItem>
  </Menu>
);

const WithSubmenu = () => (
  <Menu>
    <MenuItem>item1</MenuItem>
    <MenuItem>item2</MenuItem>
    <SubMenu title="subTitle">
      <MenuItem>item2-1</MenuItem>
      <MenuItem>item2-2</MenuItem>
    </SubMenu>
  </Menu>
);

const WithDefaultIndex = () => (
  <Menu defaultIndex="1">
    <MenuItem>item1</MenuItem>
    <MenuItem>item2</MenuItem>
    <SubMenu title="subTitle">
      <MenuItem>item2-1</MenuItem>
      <MenuItem>item2-2</MenuItem>
    </SubMenu>
  </Menu>
);

const WithDefaultExpand = () => (
  <Menu expandMenus={["2"]} mode="vertical">
    <MenuItem>item1</MenuItem>
    <MenuItem>item2</MenuItem>
    <SubMenu title="subTitle">
      <MenuItem>item2-1</MenuItem>
      <MenuItem>item2-2</MenuItem>
    </SubMenu>
  </Menu>
);

storiesOf("Menu", module)
  .add("default", Default)
  .add("onselect callback", OnSelect)
  .add("disabled", Disabled)
  .add("submenu", WithSubmenu)
  .add("default active", WithDefaultIndex)
  .add("default vertical expand submenu", WithDefaultExpand);
