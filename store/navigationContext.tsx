import React, { createContext, useContext, useState } from "react";

interface NavigationContextProps {
  hideTabBar: boolean;
  setHideTabBar: React.Dispatch<React.SetStateAction<boolean>>
}

const NavigationContext = createContext<NavigationContextProps>({
  hideTabBar: false,
  setHideTabBar: () => {}
});

export const NavigationProvider: React.FC = ({children}) => {
  const [hideTabBar, setHideTabBar] = useState(false);

  const value = {
    hideTabBar,
    setHideTabBar
  }

  return <NavigationContext.Provider value={value}>
    {children}
  </NavigationContext.Provider>
}

export const useNavigationContext = () => useContext(NavigationContext);