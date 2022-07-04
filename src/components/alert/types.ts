import { SizeType } from "../config-provider/size";
import { tuple } from "../../utils/types.utils";
import React from "react";

export const AlertTypes = tuple("success", "info", "warning", "error");
export type AlertType = typeof AlertTypes[number];

export interface AlertProps {
  type?: AlertType;
  size?: SizeType;
  closeable?: boolean;
  closeCallback?: () => void;
  message: React.ReactNode;
  description?: React.ReactNode;
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}
