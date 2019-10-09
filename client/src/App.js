import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';

// import UnauthorizedLayout from './components/layout/UnauthorizedLayout';
// import PrivateRoute from './components/routes/PrivateRoute';
// import AppLayout from './components/layout/AppLayout';

import './assets/sass/main.scss';

const App = () => (
  <Router history={history}>
    <div className='inner-root'>
      <h1>Banshee</h1>
      {/* <Switch>
        <Route path='/auth' component={UnauthorizedLayout} />
        <PrivateRoute path='/app' component={AppLayout} />
        <Redirect to='/auth' />
      </Switch> */}
    </div>
  </Router>
);

export default App;
