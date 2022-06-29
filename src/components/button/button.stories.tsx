import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./index";
import { action } from "@storybook/addon-actions";
import { ButtonTypes } from "./types";
import { SizeTypes } from "../config-provider/size";
import Icon from "../icon";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    btnType: {
      description: "button type",
      defaultValue: "default",
      options: ButtonTypes,
      control: { type: "select" },
    },
    size: {
      description: "button size",
      defaultValue: "middle",
      options: SizeTypes,
      control: { type: "select" },
    },
    disabled: {
      description: "disable button",
      defaultValue: false,
      options: [true, false],
      control: { type: "select" },
    },
    href:{
      description:'href for link button',
      defaultValue:undefined,
      control:{type:'text'}
    }
  },
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => (
  <Button onClick={action("click button")} {...args}>
  </Button>
);
export const Default = Template.bind({});
Default.args = {
  children:"Button"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children:(<Icon icon="check"/>)
}