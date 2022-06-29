import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon from "./index";
import { IconThemeTypes } from "./types";

export default {
  title: "Icon",
  component: Icon,
  argTypes: {
    theme: {
      name: "theme",
      type: {
        name: "string",
        required: false,
      },
      description: "color theme of icon",
      table: {
        theme: {
          summary: "string",
        },
      },
      options: IconThemeTypes,
      control: {
        type: "select",
      },
    },
    size: {
      options: [
        "xs",
        "lg",
        "sm",
        "1x",
        "2x",
        "3x",
        "4x",
        "5x",
        "6x",
        "7x",
        "8x",
        "9x",
        "10x",
      ],
      control: {
        type: "select",
      },
    },
    border: { type: "boolean" },
    spin: {
      type: "boolean",
    },
    bounce: {
      type: "boolean",
    },
    shake: {
      type: "boolean",
    },
  },
} as ComponentMeta<typeof Icon>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Icon> = (args) => (
    <Icon {...args} />
);
export const Default = Template.bind({});
Default.args = {
  icon: "coffee",
  size: "1x",
};

export const Animated = Template.bind({})
Animated.args = {
  icon:"car",
  bounce:true,
  size: '2x',
  theme:'warning'
}
