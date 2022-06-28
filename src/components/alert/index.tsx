import { getDataOrAriaProps } from "@/utils";
import classNames from "classnames";
import Button from "../button";
import { AlertProps } from "./types";

const Alert: React.FC<AlertProps> = ({
  description,
  message,
  className = "",
  style,
  closeable,
  closeCallback,
  closeText,
  type,
  children,
  ...rest
}) => {
  /** 关闭按钮的文字或者一个X */
  const renderCloseIcon = () =>
    closeable ? (
      <Button onClick={closeCallback} className="close-button">
        {closeText ? (
          <span className={`alert-close-text`}>{closeText}</span>
        ) : (
          "X"
        )}
      </Button>
    ) : null;

  const classes = classNames(
    "alert",
    `alert-${type}`,
    {
      [`alert-with-description`]: !!description,
    },

    className
  );

  const dataOrAriaProps = getDataOrAriaProps(rest);

  return (
    <div className={classes} style={style} role="alert" {...dataOrAriaProps}>
      <div className={`alert-content`}>
        {message ? <h4 className={`alert-message`}>{message}</h4> : null}
        {description ? (
          <div className={`alert-description`}>{description}</div>
        ) : null}
      </div>
      {renderCloseIcon()}
      {children}
    </div>
  );
};

Alert.defaultProps = {
  type: "info",
};

export default Alert;
