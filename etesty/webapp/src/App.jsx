import { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Home, NotFound, Contact, Login, Signup, Loading } from 'pages';
import { AuthContext } from 'context';

const Dashboard = lazy(() => import('pages/Dashboard'));

const ProtectedRoute = ({ component, fallbackPath, adminOnly, ...restProps }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      render={() => {
        const isAuthorized = adminOnly
          ? authContext.isAuthenticated() && authContext.isAdmin()
          : authContext.isAuthenticated();

        return isAuthorized ? <component /> : <Redirect to={fallbackPath} />;
      }}
      {...restProps}
    />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} fallbackPath="/signin" />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
