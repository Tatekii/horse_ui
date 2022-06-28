import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type IconThemeType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"

export interface IconProps extends FontAwesomeIconProps {
  theme?: IconThemeType;
}
