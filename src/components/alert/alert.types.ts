export enum AlertType {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export enum AlertSize {
  LARGE = "lg",
  SMALL = "sm",
}

export interface AlertProps {
  type?: AlertType;
  size?: AlertSize;
  closeable?: boolean;
  closeText?: string;
  closeCallback?: () => void;
  message?: React.ReactNode;
  description?: React.ReactNode;
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  className?: string;
}
