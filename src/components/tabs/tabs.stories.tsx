import Tab from ".";
import TabPane from "./tabPane";
import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";
import Icon from "../icon";

const Default = () => (
  <Tab>
    <TabPane tab="tab1">item1</TabPane>
    <TabPane tab="tab2">item2</TabPane>
  </Tab>
);

const Disabled = () => (
  <Tab>
    <TabPane tab="tab1">item1</TabPane>
    <TabPane tab="tab2" disabled>
      item2
    </TabPane>
  </Tab>
);

const WithIcon = () => (
  <Tab>
    <TabPane tab={<Icon icon="flag" />}>item1</TabPane>
    <TabPane tab="tab2">item2</TabPane>
  </Tab>
)

storiesOf("Tabs", module)
  .add("default", Default)
  .add("disabled", Disabled)
  .add("withicon", WithIcon);
