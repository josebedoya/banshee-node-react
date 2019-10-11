import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';

// Agents
import AgentsContainer from './../Agents/AgentsContainer';
import AgentContainer from './../Agents/AgentContainer';
import AgentNewContainer from './../Agents/AgentNewContainer';

const Routes = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Dashboard} />

      <Route exact path={`${match.path}/agents`} component={AgentsContainer} />
      <Route
        exact
        path={`${match.path}/agents/new`}
        component={AgentNewContainer}
      />
      <Route
        path={`${match.path}/agents/:id`}
        render={props => <AgentContainer id={props.match.params.id} />}
      />

      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default Routes;
