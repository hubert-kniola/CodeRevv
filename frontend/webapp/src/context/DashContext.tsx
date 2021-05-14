import { createContext, useState, FC } from 'react';
import { useHistory } from 'react-router-dom';

export interface IDashContext {
  mode: string;
  menuOpen: boolean;
  navbarOpen: boolean;
  setMode: (name: string) => void;
  setMenuOpen: (state: boolean) => void;
  setNavbarOpen: (state: boolean) => void;
  logout: () => void;
}

export const DashContext = createContext({} as IDashContext);

type Props = {
  logoutCallback: () => void;
};

export const DashContextProvider: FC<Props> = ({ children, logoutCallback }) => {
  const [mode, setMode] = useState('home');
  const [menuOpen, setMenuOpen] = useState(true);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const history = useHistory();

  const logout = () => {
    logoutCallback();
    history.push('/');
  };

  return (
    <DashContext.Provider value={{ mode, menuOpen, navbarOpen, setMode, setMenuOpen, setNavbarOpen, logout }}>
      {children}
    </DashContext.Provider>
  );
};
