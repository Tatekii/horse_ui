import React, { ReactNode } from "react";

type SelectedCallback = (selectedIndex: number) => void;

export interface TabProps {
  defaultActive?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: SelectedCallback;
  children?: React.ReactNode;
}

export interface TabListItemProps {
  index: number;
  label: ReactNode;
  changeActive: SelectedCallback;
  disabled?: boolean;
}

export interface TabPaneProps {
  index?: number;
  tab: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
}

export type TabContextProps =
  | {
      activeIndex: number;
      onChange?: SelectedCallback;
    }
  | undefined;
