import React, { ChangeEvent } from "react";
import { SizeType } from "../config-provider/size";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<any>, "size"> {
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  disabled?: boolean;
  size?: SizeType;
  icon?: IconProp;
  className?: string;
  // override 限制e的类型
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
