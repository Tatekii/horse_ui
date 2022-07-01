import classNames from "classnames";
import { useTabContext } from "./tabContext";
import { TabPaneProps } from "./types";

const TabPane: React.FC<TabPaneProps> = ({ index, children, ...restProps }) => {
  const { activeIndex } = useTabContext() || {};

  const classes = classNames("tab-pane", {
    "is-active": index === activeIndex,
  });
  return (
    <div className={classes} {...restProps} style={{display:'none'}}>
      {children}
    </div>
  );
};

TabPane.displayName = "TabPane";

export default TabPane;
