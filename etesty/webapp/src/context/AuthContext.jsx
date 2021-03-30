import { createContext, useState } from 'react';
import Barn from 'barn';

const emptyState = {
  expiresAt: null,
  userInfo: { name: null, surname: null, role: null },
};

const storageKey = 'authState';

const saveState = (state) => {
  const barn = new Barn(localStorage);
  barn.set(storageKey, state);
};

const loadState = () => {
  const barn = new Barn(localStorage);
  return barn.get(storageKey) || emptyState;
};

const clearState = () => {
  const barn = new Barn(localStorage);
  barn.del(storageKey);
};

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(loadState());

  const updateAuthState = ({ ...newState }) => {
    const updatedState = { ...authState, ...newState };

    saveState(updatedState);
    setAuthState(updatedState);
  };

  const isAuthenticated = () => {
    const { expiresAt, userInfo } = authState;
    return userInfo && expiresAt && new Date().getTime() / 1000 < expiresAt;
  };

  const logout = () => {
    clearState();
    setAuthState(emptyState);
  };

  return <Provider value={{ authState, updateAuthState, isAuthenticated, logout }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
