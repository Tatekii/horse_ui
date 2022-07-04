import classNames from "classnames";
import Icon from "../icon";
import { InputProps } from "./types";
import { sizeCls } from "../../utils";

const Input: React.FC<InputProps> = ({
  className,
  size,
  icon,
  prepend,
  append,
  disabled,
  style,
  ...restProps
}) => {
  const wrapperClasses = classNames("input-wrapper", {
    [`input-size-${sizeCls(size)}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  /** 修复一开始手控组件的value是空 */
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in restProps) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(restProps.value);
  }

  return (
    <div className={wrapperClasses} style={style} data-testid="input-wrapper">
      {prepend && <div className="prepend-node">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="append-node">{append}</div>}
    </div>
  );
};

export default Input;
