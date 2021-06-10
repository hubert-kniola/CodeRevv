import { createContext, useState, FC } from 'react';
import { useHistory } from 'react-router-dom';

export interface IDashContext {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
  logout: () => void;
}

export const DashContext = createContext({} as IDashContext);

type Props = {
  logoutCallback: () => void;
};

export const DashContextProvider: FC<Props> = ({ children, logoutCallback }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const history = useHistory();

  const toggleNavbar = () => setNavbarOpen((s) => !s);

  const logout = () => {
    logoutCallback();
    history.push('/');
  };

  return (
    <DashContext.Provider value={{ isNavbarOpen: navbarOpen, toggleNavbar, logout }}>{children}</DashContext.Provider>
  );
};
