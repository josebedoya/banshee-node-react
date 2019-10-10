import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

const Routes = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={Dashboard} />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default Routes;
