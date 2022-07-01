import { FC } from "react";
import Tab from "./tab";
import TabPane from "./tabPane";
import { TabPaneProps, TabProps } from "./types";

type TransTabProps = FC<TabProps> & {
  TabPane: FC<TabPaneProps>;
};

const TransTab = Tab as TransTabProps;
TransTab.TabPane = TabPane;

export default TransTab;
