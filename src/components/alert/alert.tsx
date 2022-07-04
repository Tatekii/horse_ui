import { getDataOrAriaProps } from "../../utils";
import classNames from "classnames";
import Button from "../button";
import Icon from "../icon";
import { AlertProps } from "./types";

const Alert: React.FC<AlertProps> = ({
  description,
  message,
  className = "",
  style,
  closeable,
  closeCallback,
  type,
  children,
  showIcon,
  ...rest
}) => {
  /** 关闭按钮的文字或者一个X */
  const renderCloseIcon = () =>
    closeable ? (
      <Button onClick={closeCallback} className="close-button">
        <Icon icon="close" size="lg"></Icon>
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

  const renderAlertIcon = () => {
    if (!showIcon) return;
    switch (type) {
      case "success":
        return <Icon icon="check" theme="success"></Icon>;
      case "error":
        return <Icon icon="xmark" theme="secondary"></Icon>;
      case "warning":
        return <Icon icon="triangle-exclamation" theme="warning"></Icon>;
      default:
        return <Icon icon="exclamation" theme="info"></Icon>;
    }
  };

  const dataOrAriaProps = getDataOrAriaProps(rest);

  return (
    <div className={classes} style={style} role="alert" {...dataOrAriaProps}>
      <div className={`alert-content`}>
        <>
          <h4 className={`alert-message`}>
            <span className="alert-icon">{renderAlertIcon()}</span>
            {message}
          </h4>
        </>
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
