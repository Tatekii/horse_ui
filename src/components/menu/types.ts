import React from "react";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children: React.ReactNode;
  expandMenus?: string[]; //展开submenus
}

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  children: React.ReactNode;
}

export type MenuContextProps =
  | {
      activeIndex?: string;
      onSelect?: SelectCallback;
      mode: MenuMode;
      expandMenus: string[];
    }
  | undefined;
