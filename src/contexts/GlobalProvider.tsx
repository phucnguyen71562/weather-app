import React, { createContext, ReactElement, useContext } from 'react';

const defaultValue = { isDesktop: false };

const GlobalContext = createContext(defaultValue);

export function useGlobal() {
  return useContext(GlobalContext);
}

interface Props {
  value: any;
  children: ReactElement;
}

export function GlobalProvider({ value, children }: Props) {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
