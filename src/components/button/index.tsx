import {
  AnchorButtonProps,
  ButtonProps,
  NativeButtonProps,
} from "./types";
import classNames from "classnames";
import { omit } from "@/utils/types.utils";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    className,
    htmlType = "button" as ButtonProps["htmlType"],
    ...rest
  } = props;

  const linkButtonRestProps = omit(
    rest as AnchorButtonProps & { navigate: any },
    ["navigate"]
  );

  /** 点击事件，判断是否disabled和loading */
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const { onClick } = props;
    if (disabled) {
      e.preventDefault();
      return;
    }
    (
      onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    )?.(e);
  };

  // 格式化size到class名 => large => lg
  let sizeCls = "";
  switch (size) {
    case "large":
      sizeCls = "lg";
      break;
    case "small":
      sizeCls = "sm";
      break;
    case "middle":
    case undefined:
      break;
    default:
      console.error("Button Invalid prop [size]");
  }

  // classes
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${sizeCls}`]: size,
    [`btn-disabled`]: disabled,
    disabled: btnType === "link" && disabled,
  });

  // 渲染a标签
  if (linkButtonRestProps.href) {
    return (
      <a {...linkButtonRestProps} className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  } else {
    return (
      <button
        {...(rest as NativeButtonProps)}
        type={htmlType}
        className={classes}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
