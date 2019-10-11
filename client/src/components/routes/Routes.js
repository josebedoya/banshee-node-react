import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';

// Clients
import ClientsContainer from './../Clients/ClientsContainer';
import ClientContainer from './../Clients/ClientContainer';
import ClientNewContainer from './../Clients/ClientNewContainer';

// Visits
import VisitsContainer from './../Visits/VisitsContainer';
import VisitNewContainer from './../Visits/VisitNewContainer';

// Agents
import AgentsContainer from './../Agents/AgentsContainer';
import AgentContainer from './../Agents/AgentContainer';
import AgentNewContainer from './../Agents/AgentNewContainer';

const Routes = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Dashboard} />

      <Route
        exact
        path={`${match.path}/clients`}
        component={ClientsContainer}
      />
      <Route
        exact
        path={`${match.path}/clients/new`}
        component={ClientNewContainer}
      />
      <Route
        path={`${match.path}/clients/:id`}
        render={props => <ClientContainer id={props.match.params.id} />}
      />

      <Route
        path={`${match.path}/visits-client/:id/new`}
        render={props => <VisitNewContainer id={props.match.params.id} />}
      />
      <Route
        path={`${match.path}/visits-client/:id`}
        render={props => <VisitsContainer id={props.match.params.id} />}
      />

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
