import classNames from "classnames";
import { MenuItemProps } from "./types";
import { useMenuContext } from "./menuContext";

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  let context = useMenuContext();
  if (!context) {
    console.error("Warning: MenuItem using outside of Menu");
    context = {
      activeIndex:'0',
      mode:'horizontal',
      expandMenus:[]
    };
  }
  const { activeIndex, onSelect } = context;

  const handleSelect = () => {
    if (disabled) return;
    onSelect && onSelect(index!);
  };
  
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": index === activeIndex,
  });

  return (
    <li style={style} className={classes} onClick={handleSelect}>
      {children}
    </li>
  );
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
