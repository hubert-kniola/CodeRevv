import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, NotFound, Contact, Login, Signup } from 'pages';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/signin" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
