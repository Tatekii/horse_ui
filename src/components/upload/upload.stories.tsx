import React from "react";
import { action } from "@storybook/addon-actions";
import Upload from "./";
import Icon from "@/components/icon";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload {...args}>
    <Icon icon="upload" size="5x" theme="secondary" />
    <span>Drag file over to upload</span>
  </Upload>
);

export const Default = Template.bind({});
Default.args = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange: (fileInfo) => {
    action("trigger on change,check your console");
    console.log(fileInfo);
  },
  onRemove: (file) => {
    action("removed");
    console.log("remove=>", file);
  },
  name: "filename",
  multiple: true,
  drag: true,
};
