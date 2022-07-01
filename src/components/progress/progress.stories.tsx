import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Progress from ".";

export default {
  title: "Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args}></Progress>
);


export const Default = Template.bind({});
Default.args = {
  percent: 50,
  strokeHeight: 20,
  showText: true,
  theme:"success"
};
