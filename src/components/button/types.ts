import { tuple } from "../../utils/types.utils";
import { SizeType } from "../config-provider/size";

// ant design 偷的
export const ButtonTypes = tuple("default", "primary", "link", "danger");
export type ButtonType = typeof ButtonTypes[number];
export const ButtonHTMLTypes = tuple("submit", "button", "reset");
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: SizeType;
  btnType?: ButtonType;
  children: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, "type" | "onClick">;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick">;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
