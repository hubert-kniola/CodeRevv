import { createContext, useState, ReactNode, FunctionComponent } from 'react';

type UserInfo = {
  name: string;
  surname: string;
  role: string;
};

type AuthState = {
  expiresAt?: number;
  userInfo?: UserInfo;
};

const emptyState: AuthState = {
  expiresAt: undefined,
  userInfo: undefined,
};

const storageKey = 'authState';

const saveState = (state: AuthState): void => {
  localStorage.setItem(storageKey, JSON.stringify(state));
};

const loadState = (): AuthState => {
  const item = localStorage.getItem(storageKey);
  return item != null ? JSON.parse(item) : emptyState;
};

const clearState = (): void => {
  localStorage.removeItem(storageKey);
};

interface IAuthContext {
  authState: AuthState;
  updateAuthState: (s: AuthState) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

type Props = {
  children: ReactNode;
};

const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [authState, setAuthState] = useState(loadState());

  const updateAuthState = ({ ...newState }: AuthState): void => {
    const updatedState = { ...authState, ...newState };

    saveState(updatedState);
    setAuthState(updatedState);
  };

  const isAuthenticated = (): boolean => {
    const { expiresAt, userInfo } = authState;
    return userInfo != null && expiresAt != null && new Date().getTime() / 1000 < expiresAt;
  };

  const logout = (): void => {
    clearState();
    setAuthState(emptyState);
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
