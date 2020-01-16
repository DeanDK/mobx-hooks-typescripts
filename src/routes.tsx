import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";

const Routes: React.FC = () => {
  return (
    <Route>
      <Switch>
        <Login />
      </Switch>
    </Route>
  );
};

export default Routes;
