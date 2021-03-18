import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, NotFound } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
