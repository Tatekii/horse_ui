import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Alert from "./index";
import { AlertTypes } from "./types";
import { SizeTypes } from "../config-provider/size";

export default {
  title: "Alert",
  component: Alert,
  argTypes: {
    type: {
      name: "type",
      type: {
        name: "string",
        required: false,
      },
      description: "alert type",
      table: {
        type: {
          summary: "string",
        },
        defaultValues: {
          summary: "info",
        },
      },
      options: AlertTypes,
      control: { type: "select" },
    },
    size: {
      description: "size of alert",
      options: SizeTypes,
      control: { type: "select" },
    },
    closeable: {
      description: "(close button)close alert manually",
      options: [true, false],
      control: { type: "select" },
    },
    closeCallback: {
      description: "close alert callback",
      control: { type: "object" },
    },
    message: {
      description: "main alert message title",
      control: { type: "text" },
    },
    description: {
      description: "alert description",
      control: {
        type: "text",
      },
    },
    showIcon: {
      description: "show alert type icon",
      options: [true, false],
      control: {
        type: "select",
      },
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args}></Alert>
);
export const Default = Template.bind({});
Default.args = {
  message: "Alert Message",
  description: "Alert with icon and closeable",
  showIcon: true,
};
