import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { IconProps } from "./types";

const Icon: React.FC<IconProps> = ({ className, theme, ...restProps }) => {
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });

  return (
    <FontAwesomeIcon className={classes} {...restProps} data-testid="icon" />
  );
};

export default Icon;
