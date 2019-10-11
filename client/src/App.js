import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

import { checkJWT } from './lib/jwt-methods';
import { loadUserRequest } from './redux/actions/auth-actions';

import UnauthorizedLayout from './components/layout/UnauthorizedLayout';
import PrivateRoute from './components/routes/PrivateRoute';
import AppLayout from './components/layout/AppLayout';

import 'antd/dist/antd.css';
import './assets/sass/main.scss';

const jwtoken = checkJWT();

const App = () => {
  useEffect(() => {
    if (jwtoken) {
      store.dispatch(loadUserRequest(jwtoken));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <div className='inner-root'>
          <Switch>
            <Route path='/auth' component={UnauthorizedLayout} />
            <PrivateRoute path='/app' component={AppLayout} />
            <Redirect to='/auth' />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
