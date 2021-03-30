import { createContext, useState, useEffect } from 'react';
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
  const [authState, setAuthState] = useState(emptyState);

  useEffect(() => {
    const storedState = barn.get(storageKey);

    if (storedState) {
      setAuthState(storedState);
    }
  }, []);

  const updateAuthState = (state) => {
    barn.set(storageKey, state);
    setAuthState(state);
  };

  const isAuthenticated = () => {
    const { expiresAt, userInfo } = authState;
    return userInfo && expiresAt && new Date().getTime() / 1000 < expiresAt;
  };

  const getRole = () => authState.userInfo.role;

  const logout = () => {
    barn.del(storageKey);
    setAuthState(emptyState);
  };

  return <Provider value={{ authState, updateAuthState, isAuthenticated, logout, getRole }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
