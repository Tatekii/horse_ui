import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon from "./index";

export default {
  title: "Icon",
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;
export const Default = Template.bind({});
Default.args = {
  icon: "coffee",
  size: "1x",
};

export const Animated = Template.bind({});
Animated.args = {
  icon: "car",
  bounce: true,
  size: "2x",
  theme: "warning",
};
