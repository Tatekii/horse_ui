import { createContext, useContext } from "react";
import { MenuContextProps } from "./types";

export const MenuContext = createContext<MenuContextProps>(undefined);

// export const MenuContextProvider:React.FC<React.ReactNode> = (children) => {
//   <MenuContext.Provider value={{activeIndex}}>

//   </MenuContext.Provider>
// }

export const useMenuContext = () => {
  return useContext(MenuContext);
};
