import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, NotFound, Loading } from 'pages';
import { ProtectedRoute } from 'components';

const Contact = lazy(() => import('pages/Contact'));
const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const PasswordRecover = lazy(() => import('pages/PasswordRecover'));
const AccountActivate = lazy(() => import('pages/AccountActivate'));
const Dashboard = lazy(() => import('pages/Dashboard'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/recover/:uid?/:token?" component={PasswordRecover} />
        <Route exact path="/activate/:uid/:token" component={AccountActivate} />
        <ProtectedRoute exact path="/dashboard" For={Dashboard} fallbackPath="/signin" />
        <Route exact path="/dashboardTest" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default App;
