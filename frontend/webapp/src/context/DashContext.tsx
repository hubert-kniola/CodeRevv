import { createContext, useState, FC } from 'react';

export interface IDashContext {
  mode: string;
  setMode: (name: string) => void;
}

export const DashContext = createContext({} as IDashContext);

export const DashContextProvider: FC = ({ children }) => {
  const [mode, setMode] = useState('home');

  return <DashContext.Provider value={{ mode, setMode }}>{children}</DashContext.Provider>;
};
