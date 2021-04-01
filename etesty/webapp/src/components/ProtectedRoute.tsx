import { LazyExoticComponent, useContext, FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'context';

type Props = {
  exact: boolean;
  path: string;
  For: LazyExoticComponent<() => JSX.Element>;
  fallbackPath: string;
  requiredRole?: string;
};

export const ProtectedRoute: FunctionComponent<Props> = ({ For, fallbackPath, requiredRole, ...restProps }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      render={() => {
        const roles = ['user', 'premium', 'admin'];
        if (!requiredRole) requiredRole = 'user';
        let isAuthorized = false;

        const { userInfo } = authContext.authState;

        if (roles.includes(requiredRole) && userInfo != null && roles.includes(userInfo.role)) {
          const userRoleIndex = roles.indexOf(userInfo.role);
          const requiredRoleIndex = roles.indexOf(requiredRole);

          isAuthorized = requiredRoleIndex <= userRoleIndex;
        }

        console.log(isAuthorized, authContext.isAuthenticated(), authContext.authState);

        return isAuthorized && authContext.isAuthenticated() ? <For /> : <Redirect to={fallbackPath} />;
      }}
      {...restProps}
    />
  );
};
