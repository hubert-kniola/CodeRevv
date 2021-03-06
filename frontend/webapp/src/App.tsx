import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, NotFound, Loading } from 'pages';
import { ProtectedRoute, RichTextEditor } from 'components';
import { TestEditor, TestList, TestCodeAnswer } from 'containers';

const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const PasswordRecover = lazy(() => import('pages/PasswordRecover'));
const AccountActivate = lazy(() => import('pages/AccountActivate'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const TestingForm = lazy(() => import('pages/TestingForm'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/recover/:uid?/:token?" component={PasswordRecover} />
        <Route exact path="/activate/:uid/:token" component={AccountActivate} />
        <ProtectedRoute exact path="/dashboard/:verb?/:resource?/:id?" For={Dashboard} fallbackPath="/signin" />
        <ProtectedRoute exact path="/test/:id" For={TestingForm} fallbackPath="/signin" />
        <Route exact path="/dashboardTestList" component={TestList} />
        <Route exact path="/editor" component={TestCodeAnswer} />
        <Route exact path="/creator" component={TestEditor} />
        <Route exact path="/rich" component={RichTextEditor} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default App;
