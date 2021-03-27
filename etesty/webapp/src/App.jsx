import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, NotFound, Contact, Login } from 'pages';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/signup" component={NotFound} />
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
);

export default App;
