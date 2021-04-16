import { LazyExoticComponent, useContext, FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'context';

type Props = {
  exact: boolean;
  path: string;
  For: LazyExoticComponent<FunctionComponent>;
  fallbackPath: string;
  requiredRole?: string;
};

export const ProtectedRoute: FunctionComponent<Props> = ({ For, fallbackPath, requiredRole, ...restProps }) => {
  const { hasRequiredRole } = useContext(AuthContext);

  return (
    <Route render={() => (hasRequiredRole(requiredRole) ? <For /> : <Redirect to={fallbackPath} />)} {...restProps} />
  );
};
