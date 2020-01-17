import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./screens/Home/Home";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
      <Route
        path={"/(.+)"}
        render={() => <PrivateRoute path={"/home"} component={Home} />}
      />
    </Switch>
  );
};

export default Routes;
