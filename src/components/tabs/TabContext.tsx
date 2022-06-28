import { createContext, useContext } from "react";
import { TabContextProps } from "./types";


export const TabContext = createContext<TabContextProps>(undefined)

export const useTabContext = () => {
  return useContext(TabContext)
}