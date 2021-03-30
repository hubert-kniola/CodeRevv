import { createContext, useState } from 'react';
import Barn from 'barn';

const emptyState = {
  expiresAt: null,
  userInfo: { name: null, surname: null, role: null },
};

const AuthContext = createContext();
const { Provider } = AuthContext;

const barn = new Barn(localStorage);
const storageKey = 'authState';

const AuthProvider = ({ children }) => {
  const storedState = barn.get(storageKey);
  const [authState, setAuthState] = useState(storedState ? storedState : emptyState);

  const updateAuthState = (state) => {
    barn.set(storageKey, state);
    setAuthState(state);
  };

  const isAuthenticated = () => {
    const { expiresAt, userInfo } = authState;
    return userInfo && expiresAt && new Date().getTime() / 1000 < expiresAt;
  };

  const logout = () => {
    barn.del(storageKey);
    setAuthState(emptyState);
  };

  return <Provider value={{ authState, updateAuthState, isAuthenticated, logout }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
