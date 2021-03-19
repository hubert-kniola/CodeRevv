import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Login, NotFound } from "./pages";
import { Navbar } from "./components";

import "./App.css";

const App = (props) => {
  return (
    <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
};

export default App;
