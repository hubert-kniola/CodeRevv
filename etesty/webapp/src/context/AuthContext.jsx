import { createContext, useState, useEffect } from 'react';
import Barn from 'barn';

const emptyState = {
  token: null,
  expiresAt: null,
  userInfo: {},
};

const AuthContext = createContext();
const { Provider } = AuthContext;

const barn = new Barn(localStorage);
const storageKey = 'authState';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(emptyState);

  useEffect(() => {
    setAuthState(barn.get(storageKey));
  }, []);

  const updateAuthState = (state) => {
    barn.set(storageKey, state);
    setAuthState(state);
  };

  const isAuthenticated = () => {
    const { token, expiresAt } = authState;
    return token && expiresAt && new Date().getTime() / 1000 < expiresAt;
  };

  const logout = () => {
    barn.del(storageKey);
    setAuthState(emptyState);
  };

  return <Provider value={{ authState, updateAuthState, isAuthenticated, logout }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
