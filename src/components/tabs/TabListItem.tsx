import classNames from "classnames";
import { useTabContext } from "./tabContext";
import { TabListItemProps } from "./types";

const TabListItem: React.FC<TabListItemProps> = ({
  index,
  label,
  changeActive,
  disabled,
}) => {
  const { activeIndex, onChange } = useTabContext() || {};

  const classes = classNames("tab-list-item", {
    "is-active": activeIndex === index,
    "is-disabled": disabled,
  });

  const handleClick = () => {
    if (disabled) return;
    changeActive(index);
    onChange && onChange(index);
  };

  return (
    <li className={classes} onClick={handleClick}>
      {label}
    </li>
  );
};

export default TabListItem;
