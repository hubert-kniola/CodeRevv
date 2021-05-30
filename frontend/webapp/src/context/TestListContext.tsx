import { createContext, FC, useState } from 'react';

export interface ITestListContext {}

export const TestListContext = createContext({} as ITestListContext);

export const TestListContextProvider: FC = ({ children }) => {
  return <TestListContext.Provider value={{}}>{children}</TestListContext.Provider>;
};
