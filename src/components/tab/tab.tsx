import classNames from "classnames";
import React, { useState } from "react";
import { TabContext } from "./tabContext";
import { TabPaneProps, TabProps } from "./types";
import TabListItem from "./tabListItem";

const Tab: React.FC<TabProps> = ({
  defaultActive,
  children,
  className,
  onChange,
  ...restProps
}) => {
  const [currentActive, setActive] = useState<number>(defaultActive || 0);

  const classes = classNames("tab", className, {});

  /** 渲染tab选项卡 */
  const renderTabList = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabPaneProps>;

      const name = childElement.type?.displayName;

      if (name === "TabPane") {
        const { tab, disabled } = childElement.props;
        // return React.cloneElement(childElement, { index });
        return (
          <TabListItem
            label={tab}
            index={index}
            changeActive={setActive}
            disabled={disabled}
          ></TabListItem>
        );
      } else {
        console.error("Warning: Invalid child node of Tab");
      }
    });
  };

  /** 渲染tab 内容 */
  const renderTabContent = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabPaneProps>;

      const name = childElement.type?.displayName;

      if (name === "TabPane") {
        return React.cloneElement(childElement, { index });
      } else {
        console.error("Warning: Invalid child node of Tab");
      }
    });
  };

  return (
    <div className={classes} {...restProps}>
      <TabContext.Provider value={{ activeIndex: currentActive, onChange }}>
        <ul className="tab-list">
          {/* render tab list  */}
          {renderTabList()}
        </ul>
        <div className="tab-container">
          {/* render tabpane */}
          {renderTabContent()}
        </div>
      </TabContext.Provider>
    </div>
  );
};

Tab.displayName = "Tab";
export default Tab;
