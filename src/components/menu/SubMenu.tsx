import React, { useRef, useState } from "react";
import classNames from "classnames";
import { MenuItemProps, SubMenuProps } from "./types";
import { useMenuContext } from "./MenuContext";
import Icon from "../icon";
import Transition from "../transition";

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  let context = useMenuContext();
  // 延时关闭的计时器
  let timer = useRef<any>(null);

  if (!context) {
    console.error("Warning: SubMenu using outside of Menu");
    context = {
      activeIndex: "0",
      mode: "horizontal",
      expandMenus: [],
    };
  }
  const { activeIndex, mode, expandMenus } = context;
  // 是否默认展开
  const isExpand =
    index && mode === "vertical" ? expandMenus.includes(index) : false;

  const [isSubMenuOpen, setSubMenuOpen] = useState(isExpand);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": activeIndex === index,
    "is-opened": isSubMenuOpen,
  });

  // const subMenuRef = useRef<HTMLElement | undefined>(undefined);
  /** 点击展开&关闭submenu */
  const handleClickSubMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // 判断一次是不是
    // if (e.target === subMenuRef.current) {
    setSubMenuOpen((v) => !v);
    // }
  };

  /* 处理鼠标进入/离开submenu时控制列表打开/关闭 */
  const handleHover = (e: React.MouseEvent, flag: boolean, delay = 300) => {
    e.preventDefault();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSubMenuOpen(flag);
      timer.current = null;
    }, delay);
  };
  /** hover submenu 事件 */
  const hoverEvents =
    mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleHover(e, true, 300);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleHover(e, false, 300);
          },
        }
      : {};
  /** click submenu 事件 */
  const clickEvents =
    mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => handleClickSubMenu(e),
        }
      : {};

  /** 渲染submenu接收到的子组件 */
  const renderChildren = () => {
    const ChildrenComponents = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      // NOTE 对children进行过滤
      if (childElement.type?.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          // 拼接索引
          index: `${index}-${i}`,
        });
      } else {
        console.error("Warning: Invalid child node of SubMenu");
      }
    });

    const subClasses = classNames("submenu", {
      "menu-opened": isSubMenuOpen,
    });

    return (
      <Transition animation="zoom-in-top" in={isSubMenuOpen} timeout={300}>
        <ul className={subClasses}>
          {ChildrenComponents}
        </ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
