import Tab from ".";
import { storiesOf } from "@storybook/react";
import Icon from "../icon";

const Default = () => (
  <Tab>
    <Tab.TabPane tab="tab1">item1</Tab.TabPane>
    <Tab.TabPane tab="tab2">item2</Tab.TabPane>
  </Tab>
);

const Disabled = () => (
  <Tab>
    <Tab.TabPane tab="tab1">item1</Tab.TabPane>
    <Tab.TabPane tab="tab2" disabled>
      item2
    </Tab.TabPane>
  </Tab>
);

const WithIcon = () => (
  <Tab>
    <Tab.TabPane tab={<Icon icon="flag" />}>item1</Tab.TabPane>
    <Tab.TabPane tab="tab2">item2</Tab.TabPane>
  </Tab>
);

storiesOf("Tab", module)
  .add("default", Default)
  .add("disabled", Disabled)
  .add("withicon", WithIcon);
