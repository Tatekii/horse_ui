import { tuple } from "@/utils/types.utils";

export const ThemeTypes = tuple(
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark"
);
export type ThemeType = typeof ThemeTypes[number];
