import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NotFound } from "./pages";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
