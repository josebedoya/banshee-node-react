import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';

// Agents
import AgentsContainer from './../Agents/AgentsContainer';

const Routes = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Dashboard} />

      <Route exact path={`${match.path}/agents`} component={AgentsContainer} />

      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default Routes;
