import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./index";
import { action } from "@storybook/addon-actions";
import Icon from "../icon";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => (
  <Button onClick={action("click button")} {...args}>
  </Button>
);
export const Default = Template.bind({});
Default.args = {
  children:"Button",
  btnType:'primary',
  size: 'middle',
  disabled:false,
  href:undefined
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children:(<Icon icon="check"/>)
}