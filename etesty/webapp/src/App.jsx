import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Login, NotFound, Services } from "./pages";
import { Navbar } from "./components";

import { PageContainer } from "./pages/styles";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <PageContainer>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/services" component={Services} />
          <Route component={NotFound} />
        </Switch>
      </PageContainer>
    </BrowserRouter>
  );
};

export default App;
