import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'context';

const ProtectedRoute = ({ For, fallbackPath, requiredRole, ...restProps }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      render={() => {
        const roles = ['user', 'premium', 'admin'];
        if (!requiredRole) requiredRole = 'user';
        let isAuthorized = false;

        const { userInfo } = authContext.authState;

        if (roles.includes(requiredRole) && roles.includes(userInfo.role)) {
          const userRoleIndex = roles.indexOf(userInfo.role);
          const requiredRoleIndex = roles.indexOf(requiredRole);

          isAuthorized = requiredRoleIndex <= userRoleIndex;
        }

        console.log(isAuthorized, authContext.isAuthenticated())

        return isAuthorized && authContext.isAuthenticated() ? <For /> : <Redirect to={fallbackPath} />;
      }}
      {...restProps}
    />
  );
};

export default ProtectedRoute;
