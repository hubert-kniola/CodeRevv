import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'context';

const ProtectedRoute = ({ component, fallbackPath, requiredRole, ...restProps }) => {
    const authContext = useContext(AuthContext);
  
    return (
      <Route
        render={() => {
          const roles = ['user', 'premium', 'admin'];
          if (!requiredRole) requiredRole = 'user';
          let isAuthorized = false;
  
          if (roles.includes(requiredRole) && roles.includes(authContext.getRole())) {
            const userRoleIndex = roles.indexOf(authContext.getRole());
            const requiredRoleIndex = roles.indexOf(requiredRole);
  
            isAuthorized = requiredRoleIndex <= userRoleIndex;
          }
  
          return isAuthorized && authContext.isAuthenticated() ? <component /> : <Redirect to={fallbackPath} />;
        }}
        {...restProps}
      />
    );
  };

export default ProtectedRoute;