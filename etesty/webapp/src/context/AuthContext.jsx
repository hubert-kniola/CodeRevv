import { createContext, useState, useEffect } from 'react';
import Barn from 'barn';
import axios from 'axios';

const emptyState = {
  token: null,
  expiresAt: null,
  userInfo: {},
};

const AuthContext = createContext();
const { Provider } = AuthContext;

const barn = new Barn(localStorage);
const storageKey = 'authState';

const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

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

  const isAdmin = () => authState.userInfo.role === 'admin';

  const logout = () => {
    barn.del(storageKey);
    setAuthState(emptyState);
  };

  apiAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authState.token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <Provider value={{ authState, updateAuthState, isAuthenticated, logout, isAdmin, apiAxios }}>{children}</Provider>
  );
};

export { AuthContext, AuthProvider };
