import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { ThemeType } from "../config-provider/theme";


export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeType;
}
