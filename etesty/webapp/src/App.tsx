import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, NotFound, Contact, Login, Signup, Loading, PasswordRecover } from 'pages';
import { ProtectedRoute } from 'components';

const Dashboard = lazy(() => import('pages/Dashboard'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/recover/:id?" component={PasswordRecover} />
        <ProtectedRoute exact path="/dashboard" For={Dashboard} fallbackPath="/signin" />
        <Route exact path="/dashboardTest" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default App;
