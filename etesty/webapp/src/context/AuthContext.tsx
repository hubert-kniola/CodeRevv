import { createContext, useState, FunctionComponent } from 'react';
import { apiAxios } from 'utility';

export type UserInfo = {
  name: string;
  surname: string;
  role: string;
};

export type AuthState = {
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
  updateAuthState: (state: AuthState) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
  hasRequiredRole: (role?: string) => boolean;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FunctionComponent = ({ children }) => {
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

  const logout = async () => {
    try {
      await apiAxios.post('/logout/');
    } catch (err) {}

    clearState();
    setAuthState(emptyState);
  };

  const hasRequiredRole = (role?: string): boolean => {
    const roles = ['user', 'premium', 'admin'];
    if (role == null) role = 'user';
    let isAuthorized = false;

    const { userInfo } = authState;

    if (roles.includes(role) && userInfo != null && roles.includes(userInfo.role)) {
      const userRoleIndex = roles.indexOf(userInfo.role);
      const requiredRoleIndex = roles.indexOf(role);

      isAuthorized = requiredRoleIndex <= userRoleIndex;
    }

    return isAuthorized && isAuthenticated();
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState, isAuthenticated, logout, hasRequiredRole }}>
      {children}
    </AuthContext.Provider>
  );
};
