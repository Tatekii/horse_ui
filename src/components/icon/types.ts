import { tuple } from "@/utils/types.utils";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export const IconThemeTypes = tuple(
  "primary",
  "secondary",
  "success",
  "info",
  "warning"
);
export type IconThemeType = typeof IconThemeTypes[number];

export interface IconProps extends FontAwesomeIconProps {
  theme?: IconThemeType;
}
