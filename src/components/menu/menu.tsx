import classNames from "classnames";
import { MenuItemProps, MenuProps } from "./types";
import { MenuContext } from "./menuContext";
import { useState } from "react";
import React from "react";

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    expandMenus,
  } = props;

  // 当前激活的菜单项
  const [currentActive, setActive] = useState<string>(defaultIndex!);
  /**
   * select callback
   * 切换激活index类
   * 执行回调
   * */
  const handleSelect = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect.call(null, index);
    }
  };

  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;

      const name = childElement.type?.displayName;
      // NOTE 对children进行过滤
      if (name === "MenuItem" || name === "SubMenu") {
        return React.cloneElement(childElement, { index: index + "" });
      } else {
        console.error("Warning: Invalid child node of Menu");
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider
        value={{
          activeIndex: currentActive,
          onSelect: handleSelect,
          mode: mode || "horizontal", //默认横向
          expandMenus: expandMenus || [], //默认无展开
        }}
      >
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.displayName = "Menu";
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
};

export default Menu;
